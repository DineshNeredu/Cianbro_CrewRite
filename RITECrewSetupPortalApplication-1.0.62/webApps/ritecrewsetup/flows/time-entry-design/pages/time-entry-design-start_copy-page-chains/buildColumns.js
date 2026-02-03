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
         /* ===============================
         1. INITIAL COMBINATION DATA
         =============================== */
      $variables.combinationData = [
        {
          id: 1,
          label: 'Project',
          A: '',
          B: '',
          TOTAL: ''
        },
        {
          id: 2,
          label: 'Task',
          A: '',
          B: '',
          TOTAL: ''
        },
        {
          id: 3,
          label: 'Shift',
          A: '',
          B: '',
          TOTAL: ''
        },
        {
          id: 4,
          label: 'Work Package',
          A: '',
          B: '',
          TOTAL: ''
        },
        {
          id: 5,
          label: 'Location',
          A: '',
          B: '',
          TOTAL: ''
        }
      ];

      /* ===============================
         2. INITIAL COMBINATION COLUMNS
         =============================== */
      $variables.combinationColumns = [
        { headerText: 'A', field: 'A' },
        { headerText: 'B', field: 'B' },
        { headerText: 'TOTAL', field: 'TOTAL' }
      ];

      /* ===============================
         3. INITIAL EMPLOYEE DATA
         =============================== */
      $variables.employeeData = [
        {
          id: 1,
          employee: 'John',
          timeType: 'Regular',
          jobCode: 'DEV',
          A: 0,
          B: 0,
          TOTAL: 0
        }
      ];

      /* ===============================
         4. INITIAL EMPLOYEE COLUMNS
         =============================== */
      $variables.employeeColumns = [
        { headerText: 'Employee', field: 'employee' },
        { headerText: 'Time Type', field: 'timeType' },
        { headerText: 'Job Code', field: 'jobCode' },
        { headerText: 'A', field: 'A' },
        { headerText: 'B', field: 'B' },
        { headerText: 'TOTAL', field: 'TOTAL' }
      ];

      /* ===============================
         5. REFRESH DATA PROVIDERS
         =============================== */
      $variables.combinationADP = {
        data: $variables.combinationData,
        keyAttributes: 'id'
      };

      $variables.employeeADP = {
        data: $variables.employeeData,
        keyAttributes: 'id'
      };
    }
  }

  return buildColumns;
});