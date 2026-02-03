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

      await this.removeMainSelection(context);

      if (data.combination_name !== "Custom") {


        //$variables.timeEntriesCurrentRowObj = data;
        $variables.timeEntriesCurrentRowObj.time_type = data.time_type;
        $variables.timeEntriesCurrentRowObj.total_hours = data.hours;
        $variables.timeEntriesCurrentRowObj.emp_location = data.emp_location;
        $variables.timeEntriesCurrentRowObj.combination_id = data.combination_id;
        $variables.timeEntriesCurrentRowObj.combination_name = data.combination_name;
        $variables.timeEntriesCurrentRowObj.work_package = data.work_package;
        $variables.timeEntriesCurrentRowObj.department = data.department;
        $variables.timeEntriesCurrentRowObj.project_name = data.project_name;
        $variables.timeEntriesCurrentRowObj.shift = data.shift;
        $variables.timeEntriesCurrentRowObj.task_name = data.task_name;
        $variables.timeEntriesCurrentRowObj.cost_center = data.cost_center;
        $variables.timeEntriesCurrentRowObj.actions = data.actions;
        $variables.timeEntriesCurrentRowObj.crewsetup_id = data.crewsetup_id;
        $variables.timeEntriesCurrentRowObj.crew_name = data.crew_name;
        $variables.timeEntriesCurrentRowObj.project_id = data.project_id;
        $variables.timeEntriesCurrentRowObj.project_number = data.project_number;
        $variables.timeEntriesCurrentRowObj.task_id = data.task_id;
        $variables.timeEntriesCurrentRowObj.task_number = data.task_number;
        $variables.timeEntriesCurrentRowObj.start_date = data.start_date;
        $variables.timeEntriesCurrentRowObj.end_date = data.end_date;

        await Actions.fireDataProviderEvent(context, {
          target: $variables.timeEntriesTableADP,
          update: {
            data: $variables.timeEntriesCurrentRowObj,
            keys: [
              key,
            ],
          },
        });

        await Actions.fireDataProviderEvent(context, {
          target: $variables.mainTimeEntriesTableADP,
          update: {
            data: $variables.timeEntriesCurrentRowObj,
            keys: [
              key,
            ],
          },
        });
       } else if (data.combination_name === "Custom") {
        await Actions.resetVariables(context, {
          variables: [
    '$variables.timeEntriesCustomObj',
  ],
        });

        const customDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#customDialog',
          method: 'open',
        });

      }


    }

    /**
     * @param {Object} context
     */
    async removeMainSelection(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      let tableResource = document.getElementById("time-entries-table");
      if (tableResource) {
        tableResource.selection = [];
      }

    }
  }

  return SelectValueItemChangeChain1;
});
