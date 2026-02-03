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

  class LoggerFetchBtnAction extends ActionChain {

    async run(context, { key, index, current }) {
      const { $page, $variables } = context;

      await Actions.resetVariables(context, {
        variables: ['$page.variables.ReprocesstblADP.data'],
      });

      const person_id = $variables.SearchTimeSheetADP?.data?.[index].person_id;

      

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryLogDetails',
        uriParams: {
          'p_crewsetup_id': $page.variables.searchobj.crewSetup_id,
          'p_person_id': person_id,
          'p_crew_week': $page.variables.searchobj.dateRange,
        },
      });

      

      $variables.isLogDetails = true;
      $variables.ReprocesstblADP.data = response.body?.items || [];

      await Actions.callComponentMethod(context, {
        selector: '#reprocessDialog',
        method: 'open',
      });
    }
  }

  return LoggerFetchBtnAction;
});
