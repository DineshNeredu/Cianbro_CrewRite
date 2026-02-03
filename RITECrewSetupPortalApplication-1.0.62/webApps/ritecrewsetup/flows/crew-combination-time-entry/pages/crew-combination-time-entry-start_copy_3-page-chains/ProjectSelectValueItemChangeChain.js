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

  class ProjectSelectValueItemChangeChain extends ActionChain {

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
      $variables.combinationValues[key + "_" + indexedBasedColumn + "_project_id"] = data.project_id;
      $variables.combinationValues[key + "_" + indexedBasedColumn + "_project_name"] = data.project_name;
      $variables.combinationValues[key + "_" + indexedBasedColumn + "_project_number"] = data.project_number;

      const response = await Actions.callRest(context, {
        endpoint: 'FSCM_REST_API/getProjectIdChildTasks',
        uriParams: {
          fields: 'TaskId,TaskNumber,TaskName,TaskFinishDate',
          onlyData: true,
          ProjectId: data.project_id,
        },
      });
      if(response.ok){

        const indexedBasedColumns = await $functions.getIndexedBasedColumn(current.columnIndex);
        const aDPData = await $functions.getADPTaskData(response.body.items);
        const itmCode ="Task_" + indexedBasedColumns;
        $variables.taskDPMap[itmCode] = aDPData;
        

        
      }
      console.log($variables.combinationValues);
    }
  }

  return ProjectSelectValueItemChangeChain;
});
