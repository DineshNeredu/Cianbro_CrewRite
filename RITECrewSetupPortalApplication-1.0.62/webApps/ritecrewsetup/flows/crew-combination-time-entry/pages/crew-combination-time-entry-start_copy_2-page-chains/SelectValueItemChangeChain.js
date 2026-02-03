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

  class SelectValueItemChangeChain extends ActionChain {

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
     * @param {object} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;
      // if (data) {
      //   $variables.combinationRows[0].data[current.index].id = data.project_id;
      //   $variables.combinationRows[0].data[current.index].value = data.project_name;
      // }
      if (data) {
        const response = await Actions.callRest(context, {
          endpoint: 'FSCM_REST_API/getProjectIdChildTasks',
          uriParams: {
            ProjectId: data.project_id,
            fields: 'TaskId,TaskNumber,TaskName,TaskFinishDate',
            onlyData: true,
          },
        });

      //  $variables.taskADP.data = response.body.items;
       $variables.combinationRows[0].data[current.index].value = data.project_name;
        $variables.combinationRows[1].data[current.index].tasks = response.body.items;
      }

    }
  }

  return SelectValueItemChangeChain;
});
