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
          'p_crewsetup_id': $variables.headerobj.crewsetup_id,
        },
      });
      if(response.ok){  
        $variables.rowcount = response.body.items.length -3;
        $variables.dynamicADP_New = await $functions.getTimeSheetDataNew(response.body.items);
        
      }
    }
  }

  return SearchButtonActionChain;
});
