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

  class TR_ExpenditureValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;

      $page.variables.linesObj.expenditure_type_id = data.expenditure_type_id;
      $variables.linesObj.system_linkage_function =  data.system_linkage_function;
    }
  }

  return TR_ExpenditureValueChangeAction;
});
