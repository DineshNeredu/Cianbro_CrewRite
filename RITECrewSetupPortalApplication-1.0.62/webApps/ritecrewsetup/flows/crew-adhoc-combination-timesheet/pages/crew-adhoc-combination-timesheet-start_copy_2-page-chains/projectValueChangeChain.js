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

  class projectValueChangeChain extends ActionChain {

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
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'FSCM_REST_API/getProjectIdChildTasks',
            uriParams: {
              ProjectId: data.project_id,
            },
          });

          $variables.tasksAdp.data = response.body.items;
          $variables.timeEntryDialogobj.project_id = data.project_id;
        },
        async () => {
        },
      ].map(sequence => sequence()));
    }
  }

  return projectValueChangeChain;
});
