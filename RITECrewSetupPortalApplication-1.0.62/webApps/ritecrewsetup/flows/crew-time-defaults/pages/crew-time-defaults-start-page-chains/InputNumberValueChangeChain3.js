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

  class InputNumberValueChangeChain3 extends ActionChain {

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

      if ($variables.custDetailsObj.safety_hours && $variables.custDetailsObj.safety_rate) {
        $variables.custDetailsObj.safety_amount = $variables.custDetailsObj.safety_hours * $variables.custDetailsObj.safety_rate;
      } else {
        $variables.custDetailsObj.safety_amount = 0;
      }

    }
  }

  return InputNumberValueChangeChain3;
});
