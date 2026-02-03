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

  class AddEntryActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables , $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.timeEntriesCurrentRowObj',
    '$variables.resourceObj.resource_name',
    '$variables.resourceObj.resource_number',
    '$variables.combinationLOV.data',
    '$variables.timeEntryDialogobj',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryCombinations',
        uriParams: {
          'p_crewsetup_id': $variables.headerobj.setupId,
        },
      });

      const insertCustCombination = await $functions.insertCustCombination(response.body.items);

      $variables.combinationLOV.data = insertCustCombination;

      $variables.isEdit = false;
      $variables.isAdd = false;



      const timeEntryDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#time-entry-dialog',
        method: 'open',
      });
    }
  }

  return AddEntryActionChain;
});
