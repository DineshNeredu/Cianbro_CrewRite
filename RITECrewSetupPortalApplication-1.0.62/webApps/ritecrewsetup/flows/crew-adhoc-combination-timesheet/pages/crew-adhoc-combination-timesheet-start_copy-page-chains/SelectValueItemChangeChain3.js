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

  class SelectValueItemChangeChain3 extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables } = context;

      await this.removeMainSelection(context);

      $variables.timeEntriesCurrentRowObj.resource_name = data.resource_name;
      $variables.timeEntriesCurrentRowObj.resource_number = data.resource_number;
      $variables.timeEntriesCurrentRowObj.resource_role = data.resource_role;

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

  return SelectValueItemChangeChain3;
});
