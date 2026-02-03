define([], () => {
  'use strict';

  class PageModule {

    weekDaysCount(startDay, endDay) {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const startIndex = weekdays.indexOf(startDay);
      const endIndex = weekdays.indexOf(endDay);
      let diff = endIndex - startIndex;

      // Adjust the difference if endDay comes before startDay in the week
      if (diff < 0) {
        diff += 7;
      }

      // If startDay and endDay are the same, return 1
      if (diff === 0) {
        return 1;
      }

      // For cases where endDay is after startDay, return the number of days between inclusive
      return diff + 1;
    }


    // formatDateWithoutTimezone(data) {

    //   const [year, month, day] = data.split('T')[0].split('-');
    //   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //   return `${day}-${monthNames[parseInt(month) - 1]}-${year}`;
    // }


    formatDateWithoutTimezone(data) {
      const expectedFormat = /^\d{2}-[A-Za-z]{3}-\d{4}$/;
      if (expectedFormat.test(data)) {
        return data;
      }
      const [year, month, day] = data.split('T')[0].split('-');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${day}-${monthNames[parseInt(month) - 1]}-${year}`;
    }

    hasValidEffectiveStartDates(arr) {
      return arr.every(item => item.effective_start_date !== null && item.effective_start_date !== undefined);
    }

    getFormattedDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[today.getMonth()];
      const year = today.getFullYear();
      return `${day}-${month}-${year}`;
    }



  }
  PageModule.prototype.getERPSystem = function () {
    return [
      {
        "value": "Oracle EBS"
      },
      {
        "value": "SAP"
      },
      {
        "value": "Oracle Cloud"
      },
      {
        "value": "Salesforce"
      }
    ];
  };
  PageModule.prototype.getYesNo = function () {
    return [
      {
        "value": "Yes"
      },
      {
        "value": "No"
      }
    ];
  };
  PageModule.prototype.getUniqueCustomers = function (data) {
    if (data) {
      let bodyArray = { body: { items: [] } };
      let uniqcust = [];

      data.forEach(itm => {
        if (!uniqcust.includes(itm.customer_name)) {
          bodyArray.body.items.push(itm);
          uniqcust.push(itm.customer_name);
        }
      });
      return bodyArray;
    }
  };
  PageModule.prototype.getCustomer = function (data) {
    if (data) {
      let customers = [];
      data.forEach((itm) => {
        let obj = {
          "CUSTOMER_NAME": itm.contract_id,
          "CUSTOMER_NUMBER": itm.contract_number
        };
        customers.push(obj);
      });
      return customers;
    }

  };
  PageModule.prototype.getProjectsUpdatePayload = function (data, defaults, user) {
    if (data) {
      debugger;
      let obj = {
        week_start_day: data.week_start_day,
        week_end_day: data.week_end_day,
        no_of_days: data.no_of_days,
        start_time: data.start_time ,
        end_time: data.end_time ,
        ot_threshold_measure: data.ot_threshold_measure,
        ot_threshold_limit: data.ot_threshold_limit,
        billing_frequency: data.billing_frequency,
        client_erp: data.client_erp_system ,
        active_flag: data.active_flag,
        time_entry_method: defaults.time_entry_method,
        effective_start_date: this.formatDateWithoutTimezone(data.effective_start_date),
        effective_end_date: this.formatDateWithoutTimezone(data.effective_end_date),
        per_diem: data.per_diem,
        per_diem_hours: data.per_dm_hours,
        per_diem_rate: data.per_dm_rate,
        per_diem_amount:data.per_dm_amount,
        bonus: data.bonus,
        bonus_hours: data.bonus_hours,
        bonus_rate: data.bonus_rate,
        bonus_amount: data.bonus_amount,
        safety_bonus: data.safety_bonus,
        safety_bonus_hours: data.safety_hours,
        safety_bonus_rate: data.safety_rate,
        safety_bonus_amount: data.safety_amount,
        last_updated_by: user,
        last_update_date: this.getFormattedDate(),       
        ot_shift_name: data.ot_shift_name,
        project_id:defaults.project_id,
        project_number:defaults.project_number
      };
      return obj;

    }
  };
  PageModule.prototype.getCustomerUpdatePayload= function(data,defaults,user,contractId){
    if (data) {
      debugger;
      let obj = {
        week_start_day: data.week_start_day,
        week_end_day: data.week_end_day,
        no_of_days: data.no_of_days,
        start_time: data.start_time ,
        end_time: data.end_time ,
        ot_threshold_measure: data.ot_threshold_measure,
        ot_threshold_limit: data.ot_threshold_limit,
        billing_frequency: data.billing_frequency,
        client_erp: data.client_erp_system ,
        active_flag: data.active_flag,
        time_entry_method: defaults.time_entry_method,
        effective_start_date: this.formatDateWithoutTimezone(data.effective_start_date),
        effective_end_date: this.formatDateWithoutTimezone(data.effective_end_date),
        per_diem: data.per_diem,
        per_diem_hours: data.per_dm_hours,
        per_diem_rate: data.per_dm_rate,
        per_diem_amount:data.per_dm_amount,
        bonus: data.bonus,
        bonus_hours: data.bonus_hours,
        bonus_rate: data.bonus_rate,
        bonus_amount: data.bonus_amount,
        safety_bonus: data.safety_bonus,
        safety_bonus_hours: data.safety_hours,
        safety_bonus_rate: data.safety_rate,
        safety_bonus_amount: data.safety_amount,
        last_updated_by: user,
        last_update_date: this.getFormattedDate(),
        contract_id: contractId,
        ot_shift_name: data.ot_shift_name
      };
      return obj;

    }
  };
  PageModule.prototype.getCustomerDtls = function (data) {
    if (data) {
      let customers = [];
      data.forEach((itm) => {
        itm.per_dm_amount=itm.per_diem_amount;
        itm.per_dm_hours=itm.per_diem_hours;
        itm.per_dm_rate=itm.per_diem_rate;
        itm.safety_amount=itm.safety_bonus_amount;
        itm.safety_hours=itm.safety_bonus_hours;
        itm.safety_rate=itm.safety_bonus_rate;
        customers.push(itm);
      });
      return customers;
    }
  };




  return PageModule;
});
