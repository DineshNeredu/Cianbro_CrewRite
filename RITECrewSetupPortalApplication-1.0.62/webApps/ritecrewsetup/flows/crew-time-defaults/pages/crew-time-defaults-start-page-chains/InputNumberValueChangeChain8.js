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

  class InputNumberValueChangeChain8 extends ActionChain {

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

      if ($variables.updateProjects.safety_bonus_hours && $variables.updateProjects.safety_bonus_rate) {
        $variables.updateProjects.safety_bonus_amount = $variables.updateProjects.safety_bonus_hours * $variables.updateProjects.safety_bonus_rate;
      }
    }
  }

  return InputNumberValueChangeChain8;
});
