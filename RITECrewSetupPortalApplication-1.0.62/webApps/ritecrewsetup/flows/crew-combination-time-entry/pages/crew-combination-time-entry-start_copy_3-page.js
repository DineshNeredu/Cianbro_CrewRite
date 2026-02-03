/**
 * Copyright (c)2020, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */
define([
  "ojs/ojconverter-number",
  "ojs/ojarraydataprovider"
], (NumberConverter,
  ArrayDataProvider

) => {
  "use strict";

  class PageModule {
    constructor() {
      this.editingInProgress = false; // keeps track if editing is going on
      this.numberConverter = new NumberConverter.IntlNumberConverter({
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
        maximumFractionDigits: 0,
      });


    }
    getColumnName(row) {
      let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let field = cols[row.columnIndex - 1];
      return row.key + '_' + field;
    };
    
    getColumnNameNew(row) {
      debugger;
      let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let field = cols[row.columnIndex - 3];
      return row.key + '_' + field;
    };
    getIndexedBasedColumn(indx) {
      let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      return cols[indx - 1];
    }
    getIndexedBasedColumnNew(indx) {
      let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      return cols[indx - 3];
    }

    getTableData() {
      let data = [
        {
          "tname": "Projects",
          "A": "",
          "B": "",
          "C": "",
          "D": ""

        },
        {

          "tname": "Task",
          "A": "",
          "B": "",
          "C": "",
          "D": ""

        },
        {

          "tname": "Shift",
          "A": "",
          "B": "",
          "C": "",
          "D": ""

        },
        {

          "tname": "Work Package",
          "A": "",
          "B": "",
          "C": "",
          "D": ""

        },
        {
          "tname": "Location",
          "A": "",
          "B": "",
          "C": "",
          "D": ""

        }

      ];
      return data;
    };
    getTimeSheetData() {
      let data = [
        {
          "employee": "John Smith",
          "timeType": "REG",
          "JobCode": "LABOUR",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "TOTAL": ""
        },
        {

          "employee": "Mike",
          "timeType": "REG",
          "JobCode": "LABOUR",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "TOTAL": ""
        },
        {

          "employee": "Sara",
          "timeType": "REG",
          "JobCode": "LABOUR",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "TOTAL": ""
        }


      ];
      return data;

    }
    getADPData(data) {
      return new ArrayDataProvider(data, { keyAttributes: 'tname' });
    };
    getADPTaskData(data) {
      return new ArrayDataProvider(data, { keyAttributes: 'TaskName' });
    };
    getADPTablekData(data) {
      return new ArrayDataProvider(data, { keyAttributes: 'resource_name' });
    };
    getTotalHours(obj, key) {
      debugger;
      if (obj) {
        let total = 0;
        let keyValues = Object.keys(obj);
        keyValues.forEach((itm) => {
          if (itm.includes(key)) {
            total = total + parseInt(obj[itm]);
          }
        });
        return total;
      };
    };
    getGrandTotalHours(obj) {
      debugger;
      if (obj) {
        let total = 0;
        let keyValues = Object.keys(obj);
        keyValues.forEach((itm) => {
          if (itm.includes('R_')) {
            total = total + parseInt(obj[itm]);
          }
        });
        return total;
      };
    };
    getRowTotalHours(obj, index) {
      debugger;
      if (obj) {
        let key = "_" + this.getIndexedBasedColumnNew(index);
        let total = 0;
        let keyValues = Object.keys(obj);
        keyValues.forEach((itm) => {
          if (itm.includes(key)) {
            total = total + parseInt(obj[itm]);
          }
        });
        return total;
      };
    };
    getTimeSheetDataNew(data) {
      if (data) {
        let tdata = [];
        data.forEach((itm) => {
          let obj = {
            "resource_name": itm.resource_name,
            "resource_role": itm.resource_role,
            "time_type": "",
            "A": "",
            "B": "",
            "C": "",
            "D": "",
            "TOTAL": ""
          };
          tdata.push(obj);
        });
        let fobj = {
          "resource_name": "TOTAL",
          "resource_role": "",
          "time_type": "total",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "TOTAL": ""
        };
        tdata.push(fobj);
        return new ArrayDataProvider(tdata, { keyAttributes: 'resource_name' });
      }
    };
    getNewSetofRows(data, newChar) {
      if (data) {
        let newData = [];
        data.forEach((itm) => {
          itm[newChar] = "";
          newData.push(itm);
        });
        return newData;
      }
    };



    /**
     * Helper method to format min and max salary for range presentation in table column.
     * The helper method also handles state when job description is not yet available.
     */
    getFormattedSalaryRange(jobObject) {
      let range = "";
      if (
        jobObject.items[0] !== undefined &&
        jobObject.items[0].minSalary !== undefined
      ) {
        return (
          this.numberConverter.format(jobObject.items[0].minSalary) +
          " - " +
          this.numberConverter.format(jobObject.items[0].maxSalary)
        );
      }
      return "";
    }
    getData() {
      let data = [
        {

          "crewtype": "Projects",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "E": "",
          "F": "",
          "TOTAL": ""
        },
        {

          "crewtype": "Task",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "E": "",
          "F": "",
          "TOTAL": ""
        },
        {

          "crewtype": "Shift",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "E": "",
          "F": "",
          "TOTAL": ""
        },
        {

          "crewtype": "Work Package",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "E": "",
          "F": "",
          "TOTAL": ""
        },
        {

          "crewtype": "Location",
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "E": "",
          "F": "",
          "TOTAL": ""
        }

      ];
      return data;
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
    getSaveCombination(header, data, userDtls) {
      debugger;
      let comObj = {
        "p_crewsetup_id": header.crewsetup_id,
        "p_crew_name": header.crewname,
        "p_combination_id": 1,
        "p_combination_name": data.name,
        "p_project_id": data.project_id,
        "p_project_number": data.project_number,
        "p_project": data.project_name,
        "p_task_id": data.TaskId,
        "p_task_number": data.TaskNumber,
        "p_task_name": data.TaskName,
        "p_task_date": null,
        "p_shift": null,
        "p_location_tax_jurisdiction": null,
        "p_work_package": null,
        "p_department": null,
        "p_cost_category": null,
        "p_time_type": null,
        "p_hours": null,
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
        "p_created_by": userDtls,
        "p_last_updated_by": userDtls,
        "p_start_date": this.formatDate(header.crewDate),
        "p_end_date": null,
        "p_crew_date": this.formatDate(header.crewDate)
      };
      return comObj;
    }
    getDataAsArray(obj) {
      const map = {};
      Object.entries(obj).forEach(([key, value]) => {
        const parts = key.split('_');
        const suffix = parts[1]; // A, B, C...
        const field =
          parts.length > 2 ? parts.slice(2).join('_') : parts[0];

        if (!map[suffix]) {
          map[suffix] = {
            name: `Component ${suffix}`
          };
        }

        map[suffix][field] = value;
      });
      return Object.values(map);
    }

    getFormattedSalary(data) {
      return this.numberConverter.format(data);
    }

    columnHeaderStyle(headerContext) {
      return "width: 120px";
    }

    getHeaderClassName(headerContext) {
      return this.getClassName(headerContext.index);
    }

    getCellClassName(cellContext) {
      return this.getClassName(
        cellContext.indexes.column,
        cellContext.metadata.rowItem
      );
    }

    getClassName(columnIndex, item) {
      // if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 5) {
      //   return "oj-sm-justify-content-flex-start";
      // } else if (columnIndex === 3) {
      //   // salary column
      //   if (
      //     item !== null && item !== undefined &&
      //     (item.data.salary === undefined ||
      //       item.data.salary < item.data.jobObject.items[0].minSalary ||
      //       item.data.salary > item.data.jobObject.items[0].maxSalary)
      //   ) {
      //     return "oj-bg-danger-30";
      //   }
      // } else if (columnIndex === 4) {
      //   // salary range column
      //   return "oj-read-only oj-bg-neutral-30";
      // }
    }

    onBeforeEdit(event) {
      // conditionally disable the cells for editing by preventing default on the event
      if (event.detail.cellContext.indexes.column === 4 || event.detail.cellContext.indexes.column === 5) {
        event.preventDefault();
      } else {
        this.editingInProgress = true;

        // copy the original data of this cell
        this.bufferredRowData = Object.assign(
          {},
          event.detail.cellContext.metadata.rowItem
        );
      }
    }

    onBeforeEditEnd(event, bufferingDP, dataColumnNames) {
      if (event.detail.cancelEdit === false) {
        const editable = event.target.querySelector(".editable");

        if (editable) {
          editable.validate();

          // DataGrid does not currently support editables with async validators
          // so treating editable with 'pending' state as invalid and do not allow
          // editing to end
          if (editable.valid !== "valid") {
            event.preventDefault();
            return;
          }

          let newValue = editable.value;
          let oldValue = event.detail.cellContext.data.data;

          // from update event change the data item with latest update
          let columnIndex = event.detail.cellContext.indexes.column;
          let dataColumn = dataColumnNames[columnIndex];

          if (dataColumn === "jobObject") {
            // get the data out of the select single which is in valueItem not value
            newValue = editable.valueItem.data;
            if (oldValue.items[0].id === newValue.id) {
              return; // no change in data
            }

            // if a new job is set update three row level properties
            this.bufferredRowData.data.job = newValue.id;
            this.bufferredRowData.data.jobObject.items[0] = newValue; // update the salary range as the job title has changed
            this.bufferredRowData.data.salary = undefined; // reset the salary value as the job title has changed
          } else {
            if (newValue === oldValue) {
              return; // no change in data
            }
            this.bufferredRowData.data[dataColumn] = newValue;
          }
          // write back to the cell context for immediate update
          event.detail.cellContext.data.data =
            this.bufferredRowData.data[dataColumn];
          bufferingDP.updateItem(this.bufferredRowData);
        }
      }

      this.editingInProgress = false; // mark end of editing
    }

    isEditingCompleted() {
      if (this.editingInProgress) {
        let self = this;
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            if (this.editingInProgress) {
              // invalid data in cell being edited
              reject("error");
            } else {
              // editing finished with valid value in cell
              resolve(true);
            }
          }, 500);
        });
      }
      return true;
    }

    /**
     * Custom validator which checks that entered salary fits job's salary range.
     */
    salaryInRangeValidator(record) {
      return {
        getHint: () => "Salary has to be in job salary range",
        validate: (value) => {
          let jobRecord = this.bufferredRowData.data.jobObject.items[0];
          if (jobRecord.minSalary === undefined) {
            throw new Error(
              "cannot validate because range is not available yet"
            );
          } else if (
            value >= jobRecord.minSalary &&
            value <= jobRecord.maxSalary
          ) {
            return;
          } else {
            throw new Error("salary is out of the salary range");
          }
        },
      };
    }
    getSubmitPayload(data) {
      let obj = {
        "action": "ADD",
        "active_flag": null,
        "assignment_number": null,
        "bill_rate": null,
        "crew_week": "19-JAN-2026 to 25-JAN-2026",
        "crew_date": "19-JAN-2026",
        "crewsetup_line_id": 340,
        "equipment_category": null,
        "equipment_rate": null,
        "fri_in_time": null,
        "fri_out_time": null,
        "mon_out_time": null,
        "mon_in_time": null,
        "ot_rate": null,
        "pay_rate": null,
        "resource_name": "Phillip McArthur",
        "resource_role": "Administrative Assistant",
        "resource_type": "EMPLOYEE",
        "resource_number": "1031",
        "sat_in_time": null,
        "sat_out_time": null,
        "sun_in_time": null,
        "sun_out_time": null,
        "thu_in_time": null,
        "thu_out_time": null,
        "time_entry_mode": "CREATE",
        "total_hours": 4,
        "tue_in_time": null,
        "tue_out_time": null,
        "wed_in_time": null,
        "wed_out_time": null,
        "crewsetup_id": 351,
        "person_id": "1031",
        "po": null,
        "po_line": null,
        "project_id": 300001550010024,
        "project_number": "1066",
        "project_name": "Omaha Water Treatment Plant",
        "start_time": "",
        "status": "SUBMITTED",
        "stop_time": "",
        "task_id": 100002764825936,
        "task_name": "Painting",
        "task_number": "6 Painting",
        "uom": "Hours",
        "work_schedule": "REGULAR",
        "contract_id": null,
        "created_by": "madhu.renangi@rite.digital",
        "customer_id": null,
        "fri_total_hours": null,
        "mon_total_hours": null,
        "sat_total_hours": null,
        "sun_total_hours": null,
        "thu_total_hours": null,
        "tue_total_hours": null,
        "wed_total_hours": null,
        "time_keeper_id": null,
        "supervisor_id": null,
        "secondary_timekeeper_id": null,
        "last_updated_by": "madhu.renangi@rite.digital",
        "last_updated_date": "19-JAN-2026",
        "week_start_date": null,
        "week_end_date": null,
        "creation_date": "19-JAN-2026",
        "timesheet_week_id": 11206,
        "per_diem_rate": null,
        "per_diem_amount": null,
        "bonus_rate": null,
        "bonus_amount": null,
        "time_type": "Basic Information",
        "demobilization": null,
        "mobilization": null,
        "milage": "18.880506133778486",
        "craft_override": null,
        "cost_center": "Cost Category A",
        "department": "Human Resource",
        "emp_location": "Location A",
        "shift": "Shift A",
        "work_package": "Work Package A",
        "combination_name": "Combination A",
        "combination_id": 162
      };
      return obj;
    }
  }

  return PageModule;
});
