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

  class getCrewRite_CustomerSearchFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_CustomerSearch',
        responseType: 'getCrewRiteCustomerSearchResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });     

      return callRestEndpoint1;
    }
  }

  return getCrewRite_CustomerSearchFetch;
});
