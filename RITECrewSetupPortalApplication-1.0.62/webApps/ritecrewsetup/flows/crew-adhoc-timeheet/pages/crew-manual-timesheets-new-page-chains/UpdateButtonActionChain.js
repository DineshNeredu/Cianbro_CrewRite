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

  class UpdateButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.AdhocMainUITableADP,
        update: {
          data: $variables.selectedRow,
          keys: [$variables.selectedRow.id],
        },
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Record Updated',
        type: 'confirmation',
        displayMode: 'transient',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.selectedKeys',
  ],
      });

      const editTimecardClose = await Actions.callComponentMethod(context, {
        selector: '#edit-timecard',
        method: 'close',
      });
    }
  }

  return UpdateButtonActionChain;
});
