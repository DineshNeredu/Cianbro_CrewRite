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

  const LABEL_WIDTH = '180px';
  const FIXED_COL = '110px';
  const TOTAL_WIDTH = '120px';

  class buildColumns extends ActionChain {
    async run(context) {
      const { $page } = context;
      const dynamicColumns = $page.variables.dynamicColumns || [];

      console.log('Building columns for', dynamicColumns.length, 'dynamic columns');

      // ==========================================
      // COMBINATION TABLE COLUMNS
      // ==========================================
      const combinationColumns = [
        {
          headerText: '',
          field: 'label',
          style: `width:${LABEL_WIDTH};min-width:${LABEL_WIDTH};`,
          readOnly: true
        },
        ...dynamicColumns.map(col => ({
          headerText: col.header,
          field: col.key,
          style: `width:${FIXED_COL};min-width:${FIXED_COL};text-align:center;`
        })),
        {
          headerText: 'TOTAL',
          field: 'total',
          style: `width:${TOTAL_WIDTH};min-width:${TOTAL_WIDTH};text-align:center;font-weight:600;`,
          readOnly: true
        }
      ];

      // ==========================================
      // EMPLOYEE TABLE COLUMNS
      // ==========================================
      const employeeColumns = [
        {
          headerText: 'Employee',
          field: 'employee',
          style: `width:${LABEL_WIDTH};min-width:${LABEL_WIDTH};`,
          readOnly: true
        },
        {
          headerText: 'Time Type',
          field: 'timeType',
          style: `width:${FIXED_COL};min-width:${FIXED_COL};text-align:center;`
        },
        {
          headerText: 'Job Code',
          field: 'jobCode',
          style: `width:${FIXED_COL};min-width:${FIXED_COL};text-align:center;`
        },
        ...dynamicColumns.map(col => ({
          headerText: col.header,
          field: col.key,
          style: `width:${FIXED_COL};min-width:${FIXED_COL};text-align:center;`
        })),
        {
          headerText: 'TOTAL',
          field: 'total',
          style: `width:${TOTAL_WIDTH};min-width:${TOTAL_WIDTH};text-align:center;font-weight:600;`,
          readOnly: true
        }
      ];

      // SET COLUMNS
      $page.variables.combinationColumns = combinationColumns;
      $page.variables.employeeColumns = employeeColumns;

      console.log('Columns built successfully');
      console.log('Combination columns:', combinationColumns);
      console.log('Employee columns:', employeeColumns);
    }
  }

  return buildColumns;
});