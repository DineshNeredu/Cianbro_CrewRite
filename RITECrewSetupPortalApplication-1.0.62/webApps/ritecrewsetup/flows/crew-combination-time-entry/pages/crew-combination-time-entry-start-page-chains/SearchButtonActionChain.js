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

  class SearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_CrewResources',
        uriParams: {
          'p_crewsetup_id': $variables.headerobj.crew_setupid,
        },
      });
      if(response.ok){
        const geBodyData = await $functions.geBodyData(response.body.items);

        $variables.timeDP.data = geBodyData;
        
        
      }
    }
  }

  return SearchButtonActionChain;
});
