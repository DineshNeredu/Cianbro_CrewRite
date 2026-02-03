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

  class addRowAction extends ActionChain {
    async run(context) {
      const { $variables } = context;

      console.log('=== ADD ROW START ===');

      // Calculate next ID
      const nextId =
        $variables.combinationDataList.length === 0
          ? 1
          : Math.max(...$variables.combinationDataList.map(r => r.id)) + 1;

      // Create new row with basic fields
      const newRow = {
        id: nextId,
        isNewRow: true,
        label: `New Row ${nextId}`,
        total: 0
      };

      // Add ALL current dynamic columns to the new row
      $variables.dynamicColumns.forEach(col => {
        newRow[col.key] = '';
      });

      console.log('New row created:', newRow);

      // Add to top of list
      $variables.combinationDataList = [
        newRow,
        ...$variables.combinationDataList
      ];

      // Refresh ADP
      $variables.combinationADP.data = [...$variables.combinationDataList];

      console.log('=== ADD ROW COMPLETE ===');
    }
  }

  return addRowAction;
});