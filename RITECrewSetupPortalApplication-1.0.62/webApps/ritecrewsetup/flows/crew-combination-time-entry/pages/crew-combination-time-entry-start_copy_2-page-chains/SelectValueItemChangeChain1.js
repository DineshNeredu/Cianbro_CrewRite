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
     * @param {string} params.colkey
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem, colkey }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      debugger;
      if(key){

      const response = await Actions.callRest(context, {
        endpoint: 'FSCM_REST_API/getProjectIdChildTasks',
        uriParams: {
          ProjectId: key,
          onlyData: 'true',
          fields: 'TaskId,TaskNumber,TaskName,TaskFinishDate',
        },
      });

      const tasks = await $functions.getTasks(response.body.items);

      $variables.taskDPMap[colkey.data.key] = tasks;
      }
      
    
    }
  }

  return SelectValueItemChangeChain1;
});
