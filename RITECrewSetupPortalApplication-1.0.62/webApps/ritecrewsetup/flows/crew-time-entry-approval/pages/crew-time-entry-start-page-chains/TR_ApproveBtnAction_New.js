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

  class TR_ApproveBtnAction_New extends ActionChain {

    async run(context) {
      const { $page, $variables, $functions } = context;
let responsevar;
      if ($page.variables.searchobj.specific === "DAY") {
        await $functions.dateFormatter(
          undefined,
          undefined,
          $page.variables.searchobj.crewdate
        );
      }

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/GetTimeEntryId',
        uriParams: {
          crew_date: "",
          crew_week: $variables.searchobj.dateRange
            ? $variables.searchobj.dateRange
            : "",
          crewsetup_id: $variables.searchobj.crewSetup_id,
        },
      });

      if (response.ok && response.body.items.length > 0) {
        await ActionUtils.forEach(
          response.body.items,
          async (item) => {

            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/UpdateApproval',
              uriParams: {
                time_entry_id: item.time_entry_id,
              },
            });

            if (response2.ok) {
              await Actions.fireNotificationEvent(context, {
                summary: `Approval initiated Successfully`,
                displayMode: 'transient',
                type: 'confirmation',
              });
            } else {
              await Actions.fireNotificationEvent(context, {
                summary: `failed to initiate Approval`,
                displayMode: 'transient',
                type: 'error',
              });
            }
          },
          { mode: 'serial' }
        );
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'No Time Entry found for approval',
          displayMode: 'transient',
          type: 'warning',
        });
      }

const data = $variables.SearchTimeSheetADP.data;
const timeEntryIds = data.map(row => row.time_entry_id);


      if ($variables.selectedTimeEntryAdp.data.length <= 0) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Nothing Selected',
        });
      }

      const results = await ActionUtils.forEach($variables.selectedTimeEntryAdp.data, async (itm, indx) => {

        /* 🔁 Other APIs remain as-is */
        const response3 = await Actions.callRest(context, {
          endpoint: 'CrewRite_OIC/postCREWRITETR_ORACLE_OTL_CREATE1_0PostTimecards',
          body: {
            time_entry_id:itm.time_entry_id
          },
        });
        
        let obj={
          "TIME_ENTRY_ID":itm.time_entry_id
        };

       // const response4 = await Actions.callRest(context, {
       //   endpoint: 'CONTRACT_PROJECT_SYNC/postIcApiIntegrationV2FlowsRestProjectCREWRITETR_ORACLE_OTL_CREATE1_0PostTimecards',
        //  body: obj,
       // });

        responsevar = response3;
      }, { mode: 'serial' });

      if (responsevar.ok) {

        // if (response4.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Timesheet processing completed',
            displayMode: 'transient',
            type: 'confirmation',
          });
        // }
      }
    }
  }

  return TR_ApproveBtnAction_New;
});
