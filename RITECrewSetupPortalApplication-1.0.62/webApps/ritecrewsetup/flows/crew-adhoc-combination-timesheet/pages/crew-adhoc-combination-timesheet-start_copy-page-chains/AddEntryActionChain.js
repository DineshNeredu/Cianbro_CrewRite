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
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.timeEntriesCurrentRowObj',
  ],
      });

      $variables.isEdit = false;

      

      const timeEntryDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#time-entry-dialog',
        method: 'open',
      });
    }
  }

  return AddEntryActionChain;
});
