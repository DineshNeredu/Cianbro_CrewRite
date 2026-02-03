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

  class InputNumberValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {number} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
        debugger;

      let currentTotal = await $functions.getTotalHours($variables.combinationValues_lines, key);
      $variables.combinationValues_lines[index] = currentTotal;
      let currentRowTotal = await $functions.getRowTotalHours($variables.combinationValues_lines, current.columnIndex);
      $variables.combinationValues_lines['R_'+ current.columnIndex]= currentRowTotal;
      let currentGrandRowTotal = await $functions.getGrandTotalHours($variables.combinationValues_lines, current.columnIndex);
      $variables.combinationValues_lines[$variables.rowcount] = currentGrandRowTotal;
    }
  }

  return InputNumberValueChangeChain;
});
