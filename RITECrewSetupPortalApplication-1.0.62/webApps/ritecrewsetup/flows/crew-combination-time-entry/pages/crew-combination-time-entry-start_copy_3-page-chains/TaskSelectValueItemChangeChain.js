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

  class TaskSelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      debugger;
        

        

      const indexedBasedColumn = await $functions.getIndexedBasedColumn(current.columnIndex);
      $variables.combinationValues[key +"_"+indexedBasedColumn+"_TaskId"]=data.TaskId;
      $variables.combinationValues[key +"_"+indexedBasedColumn+"_TaskName"]=data.TaskName;
      $variables.combinationValues[key +"_"+indexedBasedColumn+"_TaskNumber"]=data.TaskNumber;
    }
  }

  return TaskSelectValueItemChangeChain;
});
