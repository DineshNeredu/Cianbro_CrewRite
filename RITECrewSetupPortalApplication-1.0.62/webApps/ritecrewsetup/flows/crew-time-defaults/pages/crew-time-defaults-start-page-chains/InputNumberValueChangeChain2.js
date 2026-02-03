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

  class InputNumberValueChangeChain2 extends ActionChain {

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
      debugger;
    if ($variables.updateContracts.safety_hours && $variables.updateContracts.safety_rate) {
        $variables.updateContracts.safety_amount = $variables.updateContracts.safety_hours * $variables.updateContracts.safety_rate;
      } else {
        $variables.updateContracts.safety_amount = 0;
      }

    }
  }

  return InputNumberValueChangeChain2;
});
