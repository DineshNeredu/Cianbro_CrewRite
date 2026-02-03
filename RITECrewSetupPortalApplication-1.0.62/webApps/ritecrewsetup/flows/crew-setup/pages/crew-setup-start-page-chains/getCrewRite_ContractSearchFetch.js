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

  class getCrewRite_ContractSearchFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ContractSearch',
        uriParams: {
          'p_customer_id': $variables.crewSetupHeaderObj.customer_id,
        },
        responseType: 'getCrewRiteContractSearchResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });
      debugger;

      const uniqContrcts = await $functions.getContractNumbers(callRestEndpoint1.body);

      return uniqContrcts;
    }
  }

  return getCrewRite_ContractSearchFetch;
});
