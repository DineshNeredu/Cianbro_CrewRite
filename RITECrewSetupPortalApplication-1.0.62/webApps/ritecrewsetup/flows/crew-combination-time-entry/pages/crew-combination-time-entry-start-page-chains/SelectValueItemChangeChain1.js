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

  class SelectValueItemChangeChain1 extends ActionChain {

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

      const columIndex = current.columnIndex;

      const indexedBasedColumn = await $functions.getIndexedBasedColumn(columIndex);
      

     const response = await Actions.callRest(context, {
        endpoint: 'FSCM_REST_API/getProjectIdChildTasks',
        uriParams: {
          fields: 'TaskId,TaskNumber,TaskName,TaskFinishDate',
          onlyData: true,
          ProjectId: data.project_id,
        },
      });
      if(response.ok){             
      const aDPTaskData = await $functions.getADPTaskData(response.body.items);     
       const itmCode ="Task_" + indexedBasedColumn;
       $variables.taskDP[itmCode] = aDPTaskData;

      

      
        
        

        
      }
    }
  }

  return SelectValueItemChangeChain1;
});
