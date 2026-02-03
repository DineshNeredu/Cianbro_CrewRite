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

  class SyncButton extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      $page.variables.disableSync = true;

      const callComponentMethodSyncDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#syncDialog',
        method: 'open',
      });
      let obj = {
        "party_name": $page.variables.syncData.party_id,
        "contract_num": $page.variables.syncData.contract_num,
        "project_name": $page.variables.syncData.project_num
      };

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_OIC/postCREWRITETR_MASTER_DATA_LOAD_V11_1_0LoadMasterDataIntoATP',
        body: obj,
      });
      // const callRestIcsEndpointPostCUSTCONTRACTMASTERLOADTODB10LOADDATATODBResult = await Actions.callRest(context, {
      //   endpoint: 'CrewRite_OIC/postCREWRITETR_MASTER_DATA_LOAD_V11_1_0LoadMasterDataIntoATP',
      // });
debugger;
      if (response.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Master Data Sync Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
      else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Master Data Sync Failed',
          displayMode: 'transient',
          type: 'warning',
        });

      }
      if ($page.variables.syncEmployee) {
        const callRestIcsEndpointPostHCMEMPTOORACLEDB10PersonSyncResult = await Actions.callRest(context, {
          endpoint: 'icsEndpoint/postHCMEMP_TO_ORACLEDB1_0PersonSync',
        });

        if (callRestIcsEndpointPostHCMEMPTOORACLEDB10PersonSyncResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Employee Data Sync Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
        }
        else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Employee Data Sync Failed',
            displayMode: 'transient',
            type: 'warning',
          });

        }
      }

      $page.variables.disableSync = false;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.syncEmployee',
        ],
      });

      const callComponentMethodSyncDialogCloseResult = await Actions.callComponentMethod(context, {
        selector: '#syncDialog',
        method: 'close',
      });
    }
  }

  return SyncButton;
});
