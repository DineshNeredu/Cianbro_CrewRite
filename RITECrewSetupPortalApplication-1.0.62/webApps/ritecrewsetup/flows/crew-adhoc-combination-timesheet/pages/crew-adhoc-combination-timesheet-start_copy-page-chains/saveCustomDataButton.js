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

  class saveCustomDataButton extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.timeEntriesCurrentRowObj.project_id = $variables.timeEntriesCustomObj.project_id;
      $variables.timeEntriesCurrentRowObj.project_number = $variables.timeEntriesCustomObj.project_number;
      $variables.timeEntriesCurrentRowObj.project_name = $variables.timeEntriesCustomObj.project_name;
      $variables.timeEntriesCurrentRowObj.shift = $variables.timeEntriesCustomObj.shift;
      $variables.timeEntriesCurrentRowObj.department = $variables.timeEntriesCustomObj.department;
      $variables.timeEntriesCurrentRowObj.emp_location = $variables.timeEntriesCustomObj.emp_location;
      $variables.timeEntriesCurrentRowObj.cost_center = $variables.timeEntriesCustomObj.cost_center;
      $variables.timeEntriesCurrentRowObj.craft_override = $variables.timeEntriesCustomObj.craft_override;
      $variables.timeEntriesCurrentRowObj.milage = $variables.timeEntriesCustomObj.milage;
      $variables.timeEntriesCurrentRowObj.mobilization = $variables.timeEntriesCustomObj.mobilization;
      $variables.timeEntriesCurrentRowObj.demobilization = $variables.timeEntriesCustomObj.demobilization;
      $variables.timeEntriesCurrentRowObj.time_type = $variables.timeEntriesCustomObj.time_type;
      $variables.timeEntriesCurrentRowObj.task_id = $variables.timeEntriesCustomObj.task_id;
      $variables.timeEntriesCurrentRowObj.task_name = $variables.timeEntriesCustomObj.task_name;
      $variables.timeEntriesCurrentRowObj.task_number = $variables.timeEntriesCustomObj.task_number;
      $variables.timeEntriesCurrentRowObj.work_location = $variables.timeEntriesCustomObj.work_location;
      $variables.timeEntriesCurrentRowObj.total_hours = $variables.timeEntriesCustomObj.total_hours;
      $variables.timeEntriesCurrentRowObj.work_package = $variables.timeEntriesCustomObj.work_package;
      $variables.timeEntriesCurrentRowObj.per_diem_amount = $variables.timeEntriesCustomObj.per_diem_amount;

      $variables.timeEntriesCurrentRowObj.combination_name = 'Custom';

      const customDialogClose = await Actions.callComponentMethod(context, {
        selector: '#customDialog',
        method: 'close',
      });
    }
  }

  return saveCustomDataButton;
});
