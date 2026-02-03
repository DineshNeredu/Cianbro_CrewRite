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

  class InputNumberValueChangeChain6 extends ActionChain {

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

      if (  $variables.updateProjects.per_diem_hours && $variables.updateProjects.per_diem_rate) {
        $variables.updateProjects.per_diem_amount = $variables.updateProjects.per_diem_hours * $variables.updateProjects.per_diem_rate;   
      }
    }
  }

  return InputNumberValueChangeChain6;
});
