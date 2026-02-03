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

  class getCrewRite_ProjectSearch2Fetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectSearch2',
        uriParams: {
          'contract_id': $variables.crewSetupHeaderObj.contract_id,
        },
        responseType: 'getCrewRiteProjectSearch2Response2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getCrewRite_ProjectSearch2Fetch;
});
