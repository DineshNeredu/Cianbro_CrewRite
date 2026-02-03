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

  class IconClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
 debugger;
       if ($page.variables.custDetailsObj.effective_start_date && $page.variables.custDetailsObj.effective_end_date) {
        $page.variables.defaultCheck = true;
        $page.variables.dialogLabel = 'Default ';

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.updateContracts',
          ],
        });

        const contractPayload = await $functions.getCustomerUpdatePayload($variables.custDetailsObj, $variables.defaultContracts, $application.user.username, current.item.data.contract_id);
       
         const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/putCrewRite_ContractSearch',
          body: contractPayload,
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Contracts Updated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });

          await Actions.callChain(context, {
            chain: 'TR_SearchCustomerValChangeAction',
            params: {
              data: $variables.custDetailsObj,
            },
          });
          
         
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Contracts Failed',
            displayMode: 'transient',
            type: 'error',
          });

        }

        



       }



      
    }
  }

  return IconClickChain;
});
