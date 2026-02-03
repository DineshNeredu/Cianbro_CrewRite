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

  class fetchLOVs_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const yesNo = await $functions.getYesNo();
      $variables.YesorNoADP.data = yesNo;
      const eRPSystem = await $functions.getERPSystem();
      $variables.ERPSystemADP.data = eRPSystem;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_CustomerDetails',
      });
      if(response.ok){
      $variables.customerADP.data = response.body.items;
      }
    }
  }

  return fetchLOVs_New;
});
