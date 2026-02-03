define(["knockout",
  "ojs/ojknockout-keyset", "ojs/ojarraytreedataprovider", 'oj-sp/spectra-shell/config/config'], function (ko, keySet, ArrayTreeDataProvider) {
    'use strict';
    //  let navigationMenu = [

    //   {
    //     id: "ConfigurationFlow",
    //     label: "Configuration Flow",
    //     icon: "",
    //     node: "parent",
    //     items: [
    //       {
    //         id: "crew_admin",
    //         label: "Configuration Settings",
    //         icon: ""

    //       },
    //       {
    //         id: "crew-time-defaults",
    //         label: "Crew Time Defaults",
    //         icon: ""

    //       }      
    //     ],
    //   },  
    //   {
    //     id: "TransactionFlow",
    //     label: "Transaction Flow",
    //     icon: "library",
    //     node: "parent",
    //     items: [
    //       {
    //         id: "crew-setup",
    //         label: "Crew Definition",
    //         icon: "",
    //       },
    //       {
    //         id: "crew-time-entry",
    //         label: "Crew Planned Time sheet",
    //         icon: "",
    //       },
    //          {
    //         id: "crew-time-entry-approval",
    //         label: "Crew Time Entry Approval",
    //         icon: "",
    //       },
    //         {
    //         id: "crew-time-entry-management",
    //         label: "Crew Time Entry Management",
    //         icon: "",
    //       }       
    //     ],
    //   },
    //   {
    //     id: "TimeEntryChannels",
    //     label: "Time Entry Channels",
    //     icon: "library",
    //     node: "parent",
    //     items: [
    //       {
    //         id: "crew-adhoc-timeheet",
    //         label: "Manual Time Entry",
    //         icon: "",
    //       },
    //       {
    //         id: "crew-adhoc-combination-timesheet",
    //         label: "Combination Time Entry",
    //         icon: "",
    //       },
    //       {
    //         id: "time-entry-design",
    //         label: "Time Entry Design",
    //         icon: "",
    //       },
    //          {
    //         id: "crew-combination-time-entry",
    //         label: "Crew Combination Time Entry",
    //         icon: "",
    //       }     

    //     ],
    //   },
    //   {
    //     id: "Analytics",
    //     label: "Analytics",
    //     icon: "book",
    //     node: "parent",
    //     items: [
    //       {
    //         id: "crew-analytics",
    //         label: "Crew Analytics",
    //         icon: "",
    //       }

    //     ],
    //   },
    // ];

    let navigationMenu = [

      {
        id: "ConfigurationFlow",
        label: "Configuration Flow",
        icon: "",
        node: "parent",
        items: [
          {
            id: "crew_admin",
            label: "Configuration Settings",
            icon: ""

          }        
        ],
      },
      {
        id: "CrewManager",
        label: "Crew Manager",
        icon: "library",
        node: "parent",
        items: [
          {
            id: "crew-time-defaults",
            label: "Crew Time Defaults",
            icon: ""

          },
          {
            id: "crew-setup",
            label: "Crew Definition",
            icon: "",
          },  
          {
            id: "crew-time-entry-management",
            label: "Crew Time Entry Management",
            icon: "",
          }
        ],
      },
       {
        id: "TimeEntry",
        label: "Time Entry",
        icon: "library",
        node: "parent",
        items: [
         {
          id: "crew-time-entry",
          label: "Crew Planned Time sheet",
          icon: "",
        },
         {
          id: "crew-adhoc-combination-timesheet",
          label: "Combination Time Entry",
          icon: "",
        },
        {
          id: "crew-time-entry-approval",
          label: "Crew Time Entry Approval",
          icon: "",
        }, 
        ],
      },

      {
        id: "TimeEntryChannels",
        label: "Time Entry Channels",
        icon: "library",
        node: "parent",
        items: [
          {
            id: "crew-adhoc-timeheet",
            label: "Manual Time Entry",
            icon: "",
          },             
          {
            id: "crew-combination-time-entry",
            label: "Crew Combination Time Entry",
            icon: "",
          }

        ],
      },
      {
        id: "Analytics",
        label: "Analytics",
        icon: "book",
        node: "parent",
        items: [
          {
            id: "crew-analytics",
            label: "Crew Analytics",
            icon: "",
          }

        ],
      },
    ];

    class AppModule {


      constructor() {
        this.metadata = {
          navigationMenu: navigationMenu,
        };
        this.navlistExpanded = new keySet.ObservableKeySet();
      }

      getMetadata() {
        return this.metadata;
      }

      getNavigationContent(roleData) {
        if (roleData) {
          let menuData = this.getMetadata();
          if (this.navigationContent === undefined) {
            const filtered = this._filterNavigationByRoles(roleData);
            const transformed = this._getNavigationData(filtered);
            this.navigationContent = ko.observable(
              new ArrayTreeDataProvider(transformed, {
                keyAttributes: "attr.id"
              })
            );
          }
          return this.navigationContent;
        }
      }
      // New Js Function For Restricting The Pages or Menus By Roles  07/09/2025
      _filterNavigationByRoles(rolesData) {
        debugger;
        if (rolesData) {
          let roleNames = rolesData.map(role => role.role_name.toLowerCase());
          const filteredMap = new Map();

          //if (roleNames.includes("oii equipment administrator jr")) {
          if (roleNames.includes("crew rite administrator")) {
           return this.metadata.navigationMenu;
          }
         /// roleNames = ['crew rite time keeper"'];
            //  roleNames = ["crew rite manager"];
            //  roleNames = ["crew rite time approver"];
          for (let parent of this.metadata.navigationMenu) {
            const parentLabel = parent.label.toLowerCase();
            let matchedItems = [];
            //
            // Handle Time Entry-related items
            if (parent.label === "Crew Manager") {
              if (roleNames.some(r => r.includes("crew rite manager"))) {
                matchedItems.push(
                  ...parent.items.filter(item => item.label === "Crew Time Defaults"));

                matchedItems.push(
                  ...parent.items.filter(item => item.label === "Crew Definition"));
                matchedItems.push(
                  ...parent.items.filter(item => item.label === "Crew Time Entry Management"));

              }   
            }
            if (parent.label === "Time Entry") {
              if (roleNames.some(r => r.includes("crew rite time approver"))) {
                matchedItems.push(
                  ...parent.items.filter(item => item.label === "Crew Time Entry Approval"));               

              }   
            }
             if (parent.label === "Time Entry") {
              if (roleNames.some(r => r.includes("crew rite time keeper"))) {
                matchedItems.push(
                  ...parent.items.filter(item => item.label === "Crew Planned Time sheet"));  
                    matchedItems.push(
                  ...parent.items.filter(item => item.label === "Combination Time Entry"));  
                


              }   
            }

           

            // Match full parent label
            if (roleNames.includes(parentLabel)) {
              matchedItems.push(...parent.items);
            }

            // Merge items under the same parent
            if (matchedItems.length > 0) {
              if (filteredMap.has(parent.id)) {
                const existing = filteredMap.get(parent.id);
                const combinedItems = [...existing.items, ...matchedItems];
                const uniqueItems = Array.from(
                  new Map(combinedItems.map(item => [item.id, item])).values()
                );
                filteredMap.set(parent.id, { ...parent, items: uniqueItems });
              } else {
                filteredMap.set(parent.id, { ...parent, items: matchedItems });
              }
            }
          }

          return Array.from(filteredMap.values());
        }
      }

      _getNavigationData(menu) {
        let navData = [],
          self = this;

        for (let i = 0; i < menu.length; i++) {
          let menuItem = {};
          let origMenuItem = menu[i];
          if (typeof origMenuItem === "object") {
            menuItem.attr = {
              id: origMenuItem.id,
              name: origMenuItem.label,
              icon: origMenuItem.icon,
              badge: origMenuItem.badge,
              node: origMenuItem.node,
            };
          }
          if (origMenuItem.items && origMenuItem.items.length > 0)
            menuItem.children = this._getNavigationData(origMenuItem.items);
          navData.push(menuItem);
        }
        return navData;
      }

      itemSelectable(context) {
        return context.leaf;
      }





      distinctresource(mydata) {
        let data = JSON.parse(mydata);
        const distinctResourceNames = [...new Set(data.map(item => item.resource_name))]
          .map(name => ({ "resource_name": name }));

        return distinctResourceNames;
      }

      populateDateRangeJS() {
debugger
        let currentDate = new Date();

        function getMonthAbbreviation(month) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return months[month];
        }

        // Start range = 3 months back (forced to Monday)
        let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
        let dayOfWeek = startDate.getDay();
        let diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startDate.setDate(diff);

        // End range = 3 months ahead
        let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 1);
        endDate.setDate(endDate.getDate() - 1);

        let valueList = [];
        let finalArray = [];

        let currentWeekStart = new Date(startDate);
        let todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        let currentWeekRange;

        while (currentWeekStart <= endDate) {

          let currentWeekEnd = new Date(currentWeekStart);
          currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

          let sdate = currentWeekStart.getDate().toString().padStart(2, '0');
          let edate = currentWeekEnd.getDate().toString().padStart(2, '0');

          let weekRange =
            `${sdate}-${getMonthAbbreviation(currentWeekStart.getMonth())}-${currentWeekStart.getFullYear()} to ` +
            `${edate}-${getMonthAbbreviation(currentWeekEnd.getMonth())}-${currentWeekEnd.getFullYear()}`;

          // Store week in list
          valueList.push(weekRange);

          // ✅ Detect CURRENT WEEK using Date comparison
          if (todayDate >= currentWeekStart && todayDate <= currentWeekEnd) {
            currentWeekRange = weekRange;
          }

          currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        }

        // Convert strings to ADP objects
        for (let i = 0; i < valueList.length; i++) {
          finalArray.push({
            range: valueList[i]
          });
        }

        // Return to VBCS
        return {
          dateRange: finalArray.reverse(),
          week: currentWeekRange
        };
      }


      getDateRange(startDay, endDay) {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const currentDate = new Date();
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        const startDayIndex = dayNames.indexOf(startDay);
        const endDayIndex = dayNames.indexOf(endDay);

        const dateRange = [];

        while (startDate <= endDate) {
          const startDateOfWeek = new Date(startDate);
          const endDateOfWeek = new Date(startDate);

          while (startDateOfWeek.getDay() !== startDayIndex) {
            startDateOfWeek.setDate(startDateOfWeek.getDate() + 1);
          }

          endDateOfWeek.setDate(startDateOfWeek.getDate() + (endDayIndex - startDayIndex));

          // If end date is before start date, adjust it to next week
          if (endDateOfWeek < startDateOfWeek) {
            endDateOfWeek.setDate(endDateOfWeek.getDate() + 7);
          }

          const rangeString = `${startDateOfWeek.getDate()}-${startDateOfWeek.toLocaleString('default', { month: 'short' })}-${startDateOfWeek.getFullYear()} to ${endDateOfWeek.getDate()}-${endDateOfWeek.toLocaleString('default', { month: 'short' })}-${endDateOfWeek.getFullYear()}`;

          dateRange.push({ range: rangeString });

          startDate.setDate(startDate.getDate() + 7);
        }

        return dateRange;
      }


      validateText() {
        return [
          {
            validate: (mytime) => {
              let enteredTime = mytime;
              if (enteredTime === null || String(enteredTime) === "") {
                throw new Error("This is a mandatory field.");
              }
              let validValue = true;
              let pattern = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/;
              let matchArray1 = enteredTime.match(pattern);

              if (matchArray1 === null) {
                enteredTime = "";
                validValue = false;
                throw new Error("Enter time in (HH:MM) format.");
              }
              let matchArray = enteredTime.split(":");
              let hour = matchArray[0];
              let minute = matchArray[1];

              if (hour < 0 || hour > 24 || hour.toString().length !== 2) {
                enteredTime = "";
                validValue = false;
                throw new Error("Hours should be  between 01 and 24.");
              }
              if (minute < 0 || minute > 59 || minute.toString().length !== 2) {
                enteredTime = "";
                validValue = false;
                throw new Error("Minutes should be  between 00 and 59.");
              }
            },
            getHint: () => "Enter time in HH:mm (24 hours) format only"
          }
        ];
      }

      timeValidator(timeObj) {
        debugger;
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        let isValid = true;
        let msg;
        days.forEach(day => {
          const inTime = timeObj[`${day}_in_time`];
          const outTime = timeObj[`${day}_out_time`];
          if (new Date(`${timeObj.effective_start_date_copy}T${inTime}`) > new Date(`${timeObj.effective_end_date_copy}T${outTime}`)) {
            msg = `Invalid time for ${day}: IN Time is greater than OUT Time`;
            isValid = false;
          }
        });
        return {
          "msg": msg,
          "isValid": isValid
        };
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

      getUniqueDayNamesBetweenDates(startDate, myendDate) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let currentDate = new Date(startDate);
        let endDate = new Date(myendDate);
        const result = {};

        while (currentDate <= endDate) {
          const dayName = daysOfWeek[currentDate.getDay()];
          result[dayName] = true;
          currentDate.setDate(currentDate.getDate() + 1);
        }
        console.log("TESTCHECK", result);
        return result;
      }




    }

    return AppModule;
  });
