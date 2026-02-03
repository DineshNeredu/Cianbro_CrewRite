define([], () => {
  'use strict';

  class PageModule {
    printFunc(abc) {
      console.log("JJJJ", abc);
    }

    savecombination(data, header, user) {
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
        "p_end_date": data.end_date ? this.formatDate(data.end_date) : null
      };
      return payload
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



    dateFormatter(startdate, enddate, crewDate) {

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

      return { "startDate": start_date, "endDate": end_date, "sysdate": sysdate, "crewDate": crew_date };
    }

    selectedData(selected, mydata, selectedKeys) {
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
