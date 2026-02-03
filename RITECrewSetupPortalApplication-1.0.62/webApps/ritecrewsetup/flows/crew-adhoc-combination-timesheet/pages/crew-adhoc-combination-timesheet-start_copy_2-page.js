define([], () => {
  'use strict';

  class PageModule {
    printFunc(abc) {
      console.log("JJJJ", abc);
    }

    insertCustCombination(rows) {
      let finalArr;
      const pushObj = {
        combination_name: "Custom",
        project: null,
        task_date: null,
        shift: null,
        location_tax_jurisdiction: null,
        work_package: null,
        department: null,
        cost_category: null,
        time_type: null,
        hours: null,
        actions: null,
        attribute1: null,
        attribute2: null,
        attribute3: null,
        attribute4: null,
        attribute5: null,
        attribute6: null,
        attribute7: null,
        attribute8: null,
        attribute9: null,
        attribute10: null,
        created_by: null,
        creation_date: null,
        last_updated_by: null,
        last_update_date: null,
        combination_id: 999999,
        crewsetup_id: rows[0].crewsetup_id,
        crew_name: rows[0].crew_name,
        project_id: null,
        project_number: null,
        task_id: null,
        task_number: null,
        task_name: null,
        start_date: null,
        end_date: null
      };

      finalArr = [...rows, pushObj];
      return finalArr;
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }


    savecombination(data, header, user) {
      // debugger;
      let payload = {
        "p_crewsetup_id": header.setupId,
        "p_crew_name": header.crewname,
        "p_combination_id": data.combination_id ? data.combination_id : null,
        "p_combination_name": data.combination_name,
        "p_project_id": data.project_id ? data.project_id : null,
        "p_project_number": data.project_number ? data.project_number : null,
        "p_project": data.project_name ? data.project_name : null,
        "p_task_id": data.task_id ? data.task_id : null,
        "p_task_number": data.task_number ? data.task_number : null,
        "p_task_name": data.task_name ? data.task_name : null,
        "p_task_date": data.task_date ? data.task_date : null,
        "p_shift": data.shift ? data.shift : null,
        "p_location_tax_jurisdiction": data.emp_location ? data.emp_location : null,
        "p_work_package": data.work_package ? data.work_package : null,
        "p_department": data.department ? data.department : null,
        "p_cost_category": data.cost_center ? data.cost_center : null,
        "p_time_type": data.time_type ? data.time_type : null,
        "p_hours": data.hours ? data.hours : null,
        "p_actions": null,
        "p_attribute1": null,
        "p_attribute2": null,
        "p_attribute3": null,
        "p_attribute4": null,
        "p_attribute5": null,
        "p_attribute6": null,
        "p_attribute7": null,
        "p_attribute8": null,
        "p_attribute9": null,
        "p_attribute10": null,
        "p_created_by": user,
        "p_last_updated_by": user,
        "p_start_date": data.start_date ? this.formatDate(data.start_date) : null,
        "p_end_date": data.end_date ? this.formatDate(data.end_date) : null,
        "p_crew_date": header.crewDate ? this.formatDate(header.crewDate) : null
      };
      return payload
    }

    buildTimeEntryObjects(arrData, currObject) {
      debugger;
      return arrData.map(item => {


        const combinationId = Number(currObject.combination_id) || 0;
        const crewLineId = Number(item.crewsetup_line_id) || 0;
        const resourceNumber = Number(item.resource_number) || 0;

        return {
          time_entry_id: combinationId + crewLineId + resourceNumber,
          reference_time_entry_id: currObject.reference_time_entry_id ?? null,
          timesheet_week_id: currObject.timesheet_week_id ?? null,
          crewsetup_id: currObject.crewsetup_id ?? null,
          crewsetup_line_id: item.crewsetup_line_id ?? item.crewsetup_line_id ?? null,
          time_keeper_id: currObject.time_keeper_id ?? null,
          secondary_timekeeper_id: currObject.secondary_timekeeper_id ?? null,
          supervisor_id: currObject.supervisor_id ?? null,
          person_id: item.resource_id ?? null,
          resource_type: item.resource_type ?? null,
          resource_name: item.resource_name ?? null,
          resource_role: item.resource_role ?? null,
          resource_number: item.resource_number ?? null,
          resource_location: item.resource_location ?? null,
          bill_rate: currObject.bill_rate ?? null,
          pay_rate: currObject.pay_rate ?? null,
          ot_rate: currObject.ot_rate ?? null,
          equipment_category: currObject.equipment_category ?? null,
          equipment_rate: currObject.equipment_rate ?? null,
          assignment_number: currObject.assignment_number ?? null,
          customer_id: currObject.customer_id ?? null,
          contract_id: currObject.contract_id ?? null,
          project_id: currObject.project_id ?? null,
          project_number: currObject.project_number ?? null,
          project_name: currObject.project_name ?? null,
          task_id: currObject.task_id ?? null,
          task_name: currObject.task_name ?? null,
          task_number: currObject.task_number ?? null,
          po: currObject.po ?? null,
          po_line: currObject.po_line ?? null,
          uom: "Hours",
          work_schedule: "REGULAR",
          action: "ADD",
          total_hours: currObject.hours ?? null,
          week_start_date: currObject.week_start_date ?? null,
          week_end_date: currObject.week_end_date ?? null,
          active_flag: currObject.active_flag ?? null,
          crew_day: currObject.crew_day ?? null,
          crew_week: currObject.crew_week ?? null,
          time_entry_mode: currObject.time_entry_mode ?? null,
          status: "SUBMITTED",
          crew_date: currObject.crew_date ?? null,
          approver_comments: currObject.approver_comments ?? null,
          created_by: currObject.created_by ?? null,
          last_updated_by: currObject.last_updated_by ?? null,
          creation_date: currObject.creation_date ?? null,
          last_updated_date: currObject.last_updated_date ?? null,
          comments: currObject.comments ?? null,
          equipment_assigned_flag: currObject.equipment_assigned_flag ?? null,
          equipment_assigned_id: currObject.equipment_assigned_id ?? null,
          per_diem_amount: currObject.per_diem_amount ?? null,
          per_diem_rate: currObject.per_diem_rate ?? null,
          bonus_amount: currObject.bonus_amount ?? null,
          bonus_rate: currObject.bonus_rate ?? null,
          payroll_flag: "Y",
          time_type: currObject.time_type ?? null,
          data_source: currObject.data_source ?? null,
          rate: currObject.rate ?? null,
          combination_id: currObject.combination_id ?? null,
          combination_name: currObject.combination_name ?? null,
          shift: currObject.shift ?? null,
          emp_location: currObject.emp_location ?? null,
          department: currObject.department ?? null,
          cost_center: currObject.cost_center ?? null,
          work_package: currObject.work_package ?? null,
          start_time: null,
          stop_time: null,
          timerecord_id: null,
          timerecord_version: null,
          part_date: null,
          actual_date: null,
          cloud_timecard_status: null,
          source: null,
          work_location: null,
          sun_in_time: null,
          sun_out_time: null,
          sun_total_hours: null,
          mon_in_time: null,
          mon_out_time: null,
          mon_total_hours: null,
          tue_in_time: null,
          tue_out_time: null,
          tue_total_hours: null,
          wed_in_time: null,
          wed_out_time: null,
          wed_total_hours: null,
          thu_in_time: null,
          thu_out_time: null,
          thu_total_hours: null,
          fri_in_time: null,
          fri_out_time: null,
          fri_total_hours: null,
          sat_in_time: null,
          sat_out_time: null,
          sat_total_hours: null,
          attribute1: null,
          attribute2: null,
          attribute3: null,
          attribute4: null,
          attribute5: null,
          milage: null,
          mobilization: null,
          demobilization: null,
          craft_override: null,
          time_entry_type: null
        };
      });
    }



    filterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(mydata);
      let keys = [];
      let filteredData = [];
      if (selected.row.isAddAll()) {
        let iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.resource_id == obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.resource_id == obj2;
          });
        });
      }
      return filteredData;
    }

    toIsoMidnightUTC(dateStr) {
      const [day, mon, year] = dateStr.split('-');

      const monthMap = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
      };

      return `${year}-${monthMap[mon]}-${day}T00:00:00.000Z`;
    }


    formatDate(input) {
      if (!input) return;
      const outputFormatRegex = /^\d{2}-[A-Za-z]{3}-\d{4}$/;
      if (outputFormatRegex.test(input)) {
        return input;
      }
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const [year, month, day] = input.split("-");
      const monthName = months[parseInt(month, 10) - 1];
      return `${day}-${monthName}-${year}`;
    }

    //extract the only 2 digits after the point
    extractNumber(input) {
      if (input) {
        const match = input.match(/\d+(\.\d+)?/);
        if (!match) return "";
        const num = parseFloat(match[0]);
        return num.toFixed(2);
      }
    }


    validateGroup(id) {
      let tracker = document.getElementById(id);
      if (tracker.valid === "valid") {
      }
      else if (tracker.valid.startsWith("invalid")) {
        if (tracker.valid === "invalidHidden") {
          tracker.showMessages();
        }
        tracker.focusOn("@firstInvalidShown");
      }
      return tracker.valid;
    }



    dateFormatter(startdate, enddate, crewDate, date) {

      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date(startdate);
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      const t2 = new Date(enddate);
      let t2Date = t2.getDate() >= 10 ? t2.getDate() : "0" + t2.getDate();
      let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let end_date = t2Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      const t3 = new Date(crewDate);
      let t3Date = t3.getDate() >= 10 ? t3.getDate() : "0" + t3.getDate();
      let crew_date = t3Date + '-' + monthNames[t3.getMonth()] + '-' + t3.getFullYear();
      let sysdate = new Date();

      return { "startDate": start_date, "endDate": end_date, "sysdate": sysdate, "crewDate": crew_date, "date": date };
    }

    selectedData(selected, mydata, selectedKeys) {
      debugger;
      let keys = [];
      let selectedData = [];
      let data = JSON.parse(mydata);
      if (selected.row.isAddAll()) {
        let iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        selectedData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.time_entry_id === obj2;
          });
        });
      }
      else {
        selectedData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.time_entry_id === obj2;
          });
        });
      }
      return selectedData;
    }



  }

  return PageModule;
});
