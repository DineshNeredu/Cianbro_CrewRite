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

  class getCrewRite_ExpenditureTypesFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ExpenditureTypes',
        responseType: 'getCrewRiteExpenditureTypesResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      const uniqueExpens=await $functions.getUniqueExpeditures(callRestEndpoint1.body);

      return uniqueExpens;
    }
  }

  return getCrewRite_ExpenditureTypesFetch;
});
