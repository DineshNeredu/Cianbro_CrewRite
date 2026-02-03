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

  class TR_DefaultContracts_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/putCrewRite_ContractSearch',
        body: $variables.defaultContracts,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Updated Successfully',
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
          summary: 'Failed Update',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
    }
  }

  return TR_DefaultContracts_New;
});
