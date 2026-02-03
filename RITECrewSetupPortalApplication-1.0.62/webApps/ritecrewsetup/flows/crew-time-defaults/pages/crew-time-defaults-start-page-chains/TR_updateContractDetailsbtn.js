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

  class TR_updateContractDetailsbtn extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables, $functions } = context;
      debugger;

      const callFunctionResult = await $application.functions.validateGroup('contractsValidgroup');

      if (callFunctionResult === 'valid') {
        $page.variables.updateContracts.ot_allowed = $page.variables.updateContracts.ot_allowed === true ? true : false;
        $page.variables.updateContracts.active_flag = $page.variables.updateContracts.active_flag === true ? true : false;

       const updatePayload= await $functions.getCustomerUpdatePayload($variables.updateContracts, $variables.defaultContracts, $application.user.username, $page.variables.updateContracts.contract_id);

      

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/putCrewRite_ContractSearch',
          body: updatePayload,
        });

        // const callRestTimeRiteOrdsServicePutUpdateContractDetailsResult = await Actions.callRest(context, {
        //   endpoint: 'TimeRite_Ords_Service/putUpdateContractDetails',
        //   body: $page.variables.updateContracts,
        // });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Contract Details Updated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          const callComponentMethodEditContractDetailsCloseResult = await Actions.callComponentMethod(context, {
            selector: '#editContractDetails',
            method: 'close',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.contractsADP',
            ],
          });

          await Actions.callChain(context, {
            chain: 'TR_SearchCustomerValChangeAction',
            params: {
              data: $variables.updateContracts,
            },
          });

          // await Actions.callChain(context, {
          //   chain: 'TR_customerSearchLOvbtn',
          // });
        }
      }
    }
  }

  return TR_updateContractDetailsbtn;
});
