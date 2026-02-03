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

  class editButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.timeEntryDialogobj',
  ],
      });

      $variables.timeEntryDialogobj = current.row;

      const timeEntryDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#time-entry-dialog',
        method: 'open',
      });
    }
  }

  return editButtonActionChain;
});
