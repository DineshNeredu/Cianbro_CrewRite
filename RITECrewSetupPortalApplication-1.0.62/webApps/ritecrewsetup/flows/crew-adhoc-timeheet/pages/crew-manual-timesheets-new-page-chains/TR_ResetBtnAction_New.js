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

  class TR_ResetBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.columns',
    '$variables.taskTblADP.data',
    '$variables.headerParams',
    '$variables.AdhocMainUITableADP.data',
    '$variables.selectedRow',
    '$variables.createObj',
  ],
      });
    }
  }

  return TR_ResetBtnAction_New;
});
