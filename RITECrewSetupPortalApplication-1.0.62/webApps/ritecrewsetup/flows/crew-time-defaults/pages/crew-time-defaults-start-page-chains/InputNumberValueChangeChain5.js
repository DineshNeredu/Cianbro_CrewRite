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

  class InputNumberValueChangeChain5 extends ActionChain {

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

      if ($variables.updateContracts.bonus_hours &&	 $variables.updateContracts.bonus_rate) {

        $variables.updateContracts.bonus_amount = $variables.updateContracts.bonus_hours * $variables.updateContracts.bonus_rate;
      }
    }
  }

  return InputNumberValueChangeChain5;
});
