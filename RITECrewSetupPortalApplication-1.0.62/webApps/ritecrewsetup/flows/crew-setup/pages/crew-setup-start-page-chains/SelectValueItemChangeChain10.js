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

  class SelectValueItemChangeChain10 extends ActionChain {

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

      if(data){
        debugger;

        $page.variables.linesObj.resource_number = data.resource_number;
        $page.variables.linesObj.resource_role = data.resource_job;
        $page.variables.linesObj.resource_location = data.resource_location;
        $page.variables.linesObj.project_assigned = data.project_assigned;
        $page.variables.linesObj.resource_id = data.resource_id;
        $page.variables.linesObj.assignment_number = data.assignment_number;
        $page.variables.linesObj.assignment_id = data.assignment_id;
         

        
      }
    }
  }

  return SelectValueItemChangeChain10;
});
