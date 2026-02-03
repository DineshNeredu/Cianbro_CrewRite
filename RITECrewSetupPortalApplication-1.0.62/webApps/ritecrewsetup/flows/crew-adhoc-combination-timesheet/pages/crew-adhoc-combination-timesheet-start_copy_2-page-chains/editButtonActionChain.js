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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$variables.timeEntryDialogobj',
          '$variables.combinationLOV.data',
        ],
      });

      $variables.resourceObj = current.row;
      $variables.timeEntryDialogobj = current.row;
      $variables.isEdit = true;
      $variables.isAdd = true;

      


      const timeEntryPopupOpen = await Actions.callComponentMethod(context, {
        selector: '#time-entry-popup',
        method: 'open',
      });



    }
  }

  return editButtonActionChain;
});
