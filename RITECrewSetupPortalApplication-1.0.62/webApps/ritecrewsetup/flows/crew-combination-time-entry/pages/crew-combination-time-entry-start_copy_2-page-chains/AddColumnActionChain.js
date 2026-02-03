define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
   "ojs/ojarraydataprovider"
], (
  ActionChain,
  Actions,
  ActionUtils,
  ArrayDataProvider
) => {
  'use strict';

  class AddColumnActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const nextChar = String.fromCharCode(65 + $variables.columns.length);
      $variables.columns.push({ key: nextChar });
      $variables.combinationValues[nextChar] = {
        projectId: null,
        task: null,
        shift: '',
        workPackage: '',
        location: ''
      };
     $variables.taskDPMap[nextChar] =  new ArrayDataProvider([], { keyAttributes: 'task_id' });

    }
  }

  return AddColumnActionChain;
});
