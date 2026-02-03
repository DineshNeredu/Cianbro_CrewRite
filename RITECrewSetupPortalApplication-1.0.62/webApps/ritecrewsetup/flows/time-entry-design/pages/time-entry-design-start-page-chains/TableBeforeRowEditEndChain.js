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

  class TableBeforeRowEditEndChain extends ActionChain {
    async run(context) {
      const { $variables, $parameters } = context;
      const { cancelEdit, rowKey, rowIndex, event } = $parameters;

      console.log('=== SAVE EDIT START ===');
      console.log('Cancel edit:', cancelEdit);
      console.log('Row key:', rowKey);
      console.log('Row index:', rowIndex);
      console.log('newCombinationRow data:', $variables.newCombinationRow);

      // ✅ If cancelled, just clear and return
      if (cancelEdit) {
        console.log('Edit cancelled, clearing newCombinationRow');
        $variables.newCombinationRow = {};
        return;
      }

      // ✅ Find the row index by ID (rowKey)
      let targetIndex = -1;
      
      if (rowKey) {
        targetIndex = $variables.combinationDataList.findIndex(
          row => row.id === rowKey
        );
      }
      
      // Fallback to rowIndex parameter
      if (targetIndex === -1 && rowIndex !== undefined && rowIndex >= 0) {
        targetIndex = rowIndex;
      }

      // Last resort: find by ID in newCombinationRow
      if (targetIndex === -1 && $variables.newCombinationRow.id) {
        targetIndex = $variables.combinationDataList.findIndex(
          row => row.id === $variables.newCombinationRow.id
        );
      }

      if (targetIndex === -1) {
        console.error('❌ Could not find row to update');
        $variables.newCombinationRow = {};
        return;
      }

      console.log('✅ Found row at index:', targetIndex);

      // ✅ Calculate total
      let total = 0;
      $variables.dynamicColumns.forEach(col => {
        const value = $variables.newCombinationRow[col.key];
        if (!isNaN(value) && value !== '' && value !== null) {
          total += Number(value);
        }
      });

      // ✅ Create updated row
      const updatedRow = {
        ...$variables.newCombinationRow,
        total: total,
        isNewRow: false
      };

      console.log('Updated row:', updatedRow);

      // ✅ Update the array immutably
      const newDataList = [...$variables.combinationDataList];
      newDataList[targetIndex] = updatedRow;
      
      $variables.combinationDataList = newDataList;
      
      // ✅ Refresh the ADP
      $variables.combinationADP.data = newDataList;

      // ✅ Clear the editing variable
      $variables.newCombinationRow = {};

      console.log('=== SAVE EDIT COMPLETE ===');
      console.log('Updated combinationDataList:', $variables.combinationDataList);
    }
  }

  return TableBeforeRowEditEndChain;
});