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

  class InputNumberValueChangeChain4 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {number} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.updateContracts.per_dm_hours &&  $variables.updateContracts.per_dm_rate) {
         $variables.updateContracts.per_dm_amount = $variables.updateContracts.per_dm_hours * $variables.updateContracts.per_dm_rate;
      }
    }
  }

  return InputNumberValueChangeChain4;
});
