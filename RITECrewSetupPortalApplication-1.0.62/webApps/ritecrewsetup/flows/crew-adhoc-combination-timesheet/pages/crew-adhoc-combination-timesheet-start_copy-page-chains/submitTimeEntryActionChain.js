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

  class submitTimeEntryActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      
      $variables.timeEntriesBlankRowObj.time_entry_id = ($variables.mainTimeEntriesTableADP.data.length === 0) ? 1 : $variables.mainTimeEntriesTableADP.data.length + 1;
      $variables.timeEntriesBlankRowObj.isNew = 'Y';

      await Actions.fireDataProviderEvent(context, {
        target: $variables.mainTimeEntriesTableADP,
        add: {
          keys: $variables.timeEntriesBlankRowObj.time_entry_id,
          data: $variables.timeEntryDialogobj,
        },
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.timeEntryDialogobj',
  ],
      });

      const timeEntryDialogClose = await Actions.callComponentMethod(context, {
        selector: '#time-entry-dialog',
        method: 'close',
      });
    }
  }

  return submitTimeEntryActionChain;
});
