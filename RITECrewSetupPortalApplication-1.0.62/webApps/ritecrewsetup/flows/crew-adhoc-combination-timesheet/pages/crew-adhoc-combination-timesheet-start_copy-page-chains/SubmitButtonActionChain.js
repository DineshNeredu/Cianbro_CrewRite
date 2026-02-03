define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class SubmitButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/GetMaxWeekid',
        uriParams: {
          'crewsetup_id': $variables.headerobj.setupId,
          'crew_week': $variables.headerobj.crewDate,
        },
      });

      $variables.headerobj.maxweekid = response2.body.items[0].weekid ? response2.body.items[0].weekid : 1;

      const results = await ActionUtils.forEach($variables.selectedData, async (item, index) => {

        const dateFormatter = await $functions.dateFormatter(item.week_start_date, item.week_end_date, $variables.headerobj.crewDate);

        const payloadData = await this.generatePayloadFunc(context, { data: item, user: $application.user.email, startdate: dateFormatter.startDate, endDate: dateFormatter.endDate, daterange: null, crewDate: $variables.headerobj.crewDate, weekid: $variables.headerobj.maxweekid });

        const response3 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/postCrewRite_TimeEntrySearch',
          body: payloadData,
        });
      }, { mode: 'serial' });

      await Actions.callChain(context, {
        chain: 'searchButtonActionChain',
      });

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Timesheet for the Selected Resources Submitted',
        displayMode: 'transient',
        type: 'confirmation',
      });
    }

    /**
     * @param {Object} context
     */
    async generatePayloadFunc(context, { data, user, startdate, endDate, daterange, crewDate, weekid }) {
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date();
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      let creationDate = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        .format(new Date(crewDate))
        .toUpperCase()
        .replace(/ /g, '-');
      const weekRange = d => { const date = new Date(d.replace(/(\d+)-(\w+)-(\d+)/, (m, day, mon, year) => `${year}-${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].indexOf(mon) + 1}-${day}`)); return { start: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date.setDate(date.getDate() - (date.getDay() || 7) + 1))).toUpperCase().replace(/ /g, '-'), end: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date.setDate(date.getDate() + (7 - (date.getDay() || 7))))).toUpperCase().replace(/ /g, '-') }; };
      let dateRange = weekRange(formattedDate);


      let obj = {
        "action": "ADD",
        "active_flag": data.active_flag,
        "assignment_number": data.assignment_number,
        "bill_rate": data.bill_rate,
        "crew_week": dateRange.start + " to " + dateRange.end,/*need to implement the logic*/
        "crew_date": formattedDate,
        "crewsetup_line_id": data.crewsetup_line_id,
        "equipment_category": data.equipment_category,
        "equipment_rate": data.equipment_rate,
        "fri_in_time": data.fri_in_time,
        "fri_out_time": data.fri_out_time,
        "mon_out_time": data.mon_out_time,
        "mon_in_time": data.mon_in_time,
        "ot_rate": data.ot_rate,
        "pay_rate": data.pay_rate,
        "resource_name": data.resource_name,
        "resource_role": data.resource_role,
        "resource_type": data.resource_type,
        "resource_number": data.resource_number,
        "sat_in_time": data.sat_in_time,
        "sat_out_time": data.sat_out_time,
        "sun_in_time": data.sun_in_time,
        "sun_out_time": data.sun_out_time,
        "thu_in_time": data.thu_in_time,
        "thu_out_time": data.thu_out_time,
        "time_entry_mode": "CREATE",
        "total_hours": data.total_hours,
        "tue_in_time": data.tue_in_time,
        "tue_out_time": data.tue_out_time,
        "wed_in_time": data.wed_in_time,
        "wed_out_time": data.wed_out_time,
        "crewsetup_id": data.crewsetup_id,
        "person_id": data.resource_number,
        "po": data.po,
        "po_line": data.po_line,
        "project_id": data.project_id,
        "project_number": data.project_number,
        "project_name": data.project_name,
        "start_time": "",
        "status": "SUBMITTED",
        "stop_time": "",
        "task_id": data.task_id,
        "task_name": data.task_name,
        "task_number": data.task_number,
        "uom": "Hours",
        "work_location": data.resource_location,
        "work_schedule": "REGULAR",
        "contract_id": data.contract_id,
        "created_by": user,
        "customer_id": data.customer_id,
        "fri_total_hours": data.fri_total_hours,
        "mon_total_hours": data.mon_total_hours,
        "sat_total_hours": data.sat_total_hours,
        "sun_total_hours": data.sun_total_hours,
        "thu_total_hours": data.thu_total_hours,
        "tue_total_hours": data.tue_total_hours,
        "wed_total_hours": data.wed_total_hours,
        "time_keeper_id": null,
        "supervisor_id": null,
        "secondary_timekeeper_id": null,
        "last_updated_by": user,
        "last_updated_date": creationDate,
        "week_start_date": data.week_start_date,
        "week_end_date": data.week_end_date,
        "creation_date": creationDate,
        "timesheet_week_id": weekid,
        "perdiem_flag": data.perdiem_flag,
        "perdiem_quantity": data.perdiem_quantity,
        "per_diem_rate": data.per_diem_rate,
        "per_diem_amount": data.per_diem_amount,
        "bonus_flag": data.bonus_flag,
        "bonus_quantity": data.bonus_quantity,
        "bonus_rate": data.bonus_rate,
        "bonus_amount": data.bonus_amount,
        "time_type": data.time_type,
        "demobilization": data.demobilization,
        "mobilization": data.mobilization,
        "milage": data.milage,
        "craft_override": data.craft_override,
        "cost_center": data.cost_center,
        "department": data.department,
        "emp_location": data.emp_location,
        "shift": data.shift,
        "work_package":data.work_package,
        "combination_name": data.combination_name,
        "combination_id": data.combination_id
      };
      return obj;

    }
  }

  return SubmitButtonActionChain;
});
