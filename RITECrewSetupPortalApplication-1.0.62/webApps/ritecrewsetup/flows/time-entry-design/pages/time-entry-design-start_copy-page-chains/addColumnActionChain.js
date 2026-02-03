define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], function (
  ActionChain,
  Actions,
  ActionUtils
) {
  'use strict';

  class addColumnActionChain extends ActionChain {
    async run(context) {
      const { $variables } = context;

      console.log('=== ADD COLUMN START ===');

      /* -----------------------------------------
       * 1. Generate new column key (A, B, C...)
       * ----------------------------------------- */
      const newColumnKey = String.fromCharCode(
        65 + $variables.dynamicColumns.length
      );

      /* -----------------------------------------
       * 2. Add column definition
       * ----------------------------------------- */
      $variables.dynamicColumns = [
        ...$variables.dynamicColumns,
        {
          key: newColumnKey,
          header: newColumnKey
        }
      ];

      console.log('Added new column:', newColumnKey);

      /* -----------------------------------------
       * 3. Update COMBINATION table rows
       * ----------------------------------------- */
      const updatedCombinationRows =
        $variables.combinationDataList.map(row => ({
          ...row,
          [newColumnKey]: ''
        }));

      $variables.combinationDataList = updatedCombinationRows;
      $variables.combinationADP.data = updatedCombinationRows;

      /* -----------------------------------------
       * 4. Update EMPLOYEE table rows
       * ----------------------------------------- */
      const updatedEmployeeRows =
        $variables.employeeDataList.map(row => ({
          ...row,
          [newColumnKey]: 0
        }));

      $variables.employeeDataList = updatedEmployeeRows;
      $variables.employeeADP.data = updatedEmployeeRows;

      /* -----------------------------------------
       * 5. Rebuild columns (after data update)
       * ----------------------------------------- */
      await Actions.callChain(context, {
        chain: 'buildColumns'
      });

      console.log('=== ADD COLUMN COMPLETE ===');
      console.log('Updated combination rows:', updatedCombinationRows);
      console.log('Updated employee rows:', updatedEmployeeRows);
    }
  }

  return addColumnActionChain;
});
