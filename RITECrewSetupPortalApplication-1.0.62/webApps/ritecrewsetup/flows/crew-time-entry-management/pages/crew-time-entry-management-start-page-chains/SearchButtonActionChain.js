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

      const dynamicColumns = await $functions.getTableColumnsWithDates($variables.timeEntryObj.week);
         $variables.columns = dynamicColumns;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_MoniteringSearch2',
        uriParams: {
          'p_crew_week': $variables.timeEntryObj.week ? $functions.getFirstDate($variables.timeEntryObj.week) : null,
          'p_crewsetup_id': $variables.timeEntryObj.crew_setupid?$variables.timeEntryObj.crew_setupid:'',
        },
      });

      $variables.timeEntryADP.data = response.body.items;

    


    }
  }

  return SearchButtonActionChain;
});
