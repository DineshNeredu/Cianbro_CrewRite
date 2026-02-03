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

  class TableBeforeRowEditChain extends ActionChain {
    async run(context) {
      const { $variables, $parameters } = context;
      const { event, rowKey, rowIndex } = $parameters;

      console.log('=== START EDIT ===');
      console.log('Event:', event);
      console.log('Row key:', rowKey);
      console.log('Row index:', rowIndex);

      // ✅ Method 1: Find row by rowKey (ID)
      const rowData = $variables.combinationDataList.find(
        row => row.id === rowKey
      );

      if (!rowData) {
        console.error('Row not found with key:', rowKey);
        
        // ✅ Method 2: Try using rowIndex as fallback
        if (rowIndex !== undefined && rowIndex >= 0) {
          const rowByIndex = $variables.combinationDataList[rowIndex];
          if (rowByIndex) {
            console.log('Found row by index:', rowByIndex);
            $variables.newCombinationRow = { ...rowByIndex };
            console.log('newCombinationRow set:', $variables.newCombinationRow);
            return;
          }
        }
        
        console.error('Could not find row by key or index');
        return;
      }

      console.log('Found row data:', rowData);

      // ✅ Clone the row data for editing
      $variables.newCombinationRow = {
        ...rowData
      };

      console.log('newCombinationRow initialized:', $variables.newCombinationRow);
    }
  }

  return TableBeforeRowEditChain;
});