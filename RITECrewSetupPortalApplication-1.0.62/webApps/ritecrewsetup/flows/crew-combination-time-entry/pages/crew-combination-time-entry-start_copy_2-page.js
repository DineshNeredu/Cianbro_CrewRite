define([
  "ojs/ojrowdatagridprovider",
  "ojs/ojarraydataprovider", 
  "ojs/ojdatagrid"
], (

  RowDataGridProvider,
  ArrayDataProvider

) => {
  'use strict';

  class PageModule {
  };

  PageModule.prototype.getTasks = function (data) {
    return new ArrayDataProvider(data, { keyAttributes: 'TaskId' });
  };


  PageModule.prototype.getDeifiationColumns = function () {
    let columns = [
      { "id": "Z", "label": "" },
      { "id": "A", "label": "A" },
      { "id": "B", "label": "B" },
      { "id": "C", "label": "C" },
      { "id": "D", "label": "D" },
      { "id": "E", "label": "E" },
      { "id": "F", "label": "F" },

      { "id": "Y", "label": "TOTAL" }
    ];
    return columns;

  };
  PageModule.prototype.getGridData = function () {

    const rows = [
      { index: 0, tname: 'Projects', values: ['', '', '', '', '', ''] },
      { index: 1, tname: 'Tasks', values: ['', '', '', '', '', ''] }
    ];

    const colHeaders = ['A', 'B', 'C', 'D', 'E', 'F'];

    const gridData = {
      rowCount: rows.length,
      columnCount: colHeaders.length,

      getValue: function (row, column) {
        return rows[row].values[column];
      },

      setValue: function (row, column, value) {
        rows[row].values[column] = value;
      },

      getRowHeader: function (row) {
        return rows[row].tname;
      },

      getColumnHeader: function (column) {
        return colHeaders[column];
      }
    };

    return new RowDataGridProvider(gridData);
  };

  PageModule.prototype.getCombinationRows = function () {
    let comRows = [
      {
        "key": "project",
        "label": "Project",
        "data": [
          { "label": "A", "value": "","type":"project","id":"" },
          { "label": "B", "value": "","type":"project","id":"" },
          { "label": "C", "value": "","type":"project","id":"" },
          { "label": "D", "value": "","type":"project","id":"" },
          { "label": "E", "value": "","type":"project","id":"" },
          { "label": "F", "value": "","type":"project","id":"" },
          { "label": "TOTAL", "value": "","type":"" }
        ]
      },
      {
        "key": "task",
        "label": "Task",
        "data": [
          { "label": "A", "value": "","type":"task","tasks":[] },
          { "label": "B", "value": "","type":"task","tasks":[] },
          { "label": "C", "value": "","type":"task","tasks":[] },
          { "label": "D", "value": "","type":"task","tasks":[] },
          { "label": "E", "value": "","type":"task","tasks":[] },
          { "label": "F", "value": "","type":"task","tasks":[] },
          { "label": "TOTAL", "value": "","type":"" }
        ]
      },
      {
        "key": "shift",
        "label": "Shift",
        "data": [
          { "label": "A", "value": "","type":"text" },
          { "label": "B", "value": "","type":"text" },
          { "label": "C", "value": "","type":"text" },
          { "label": "D", "value": "","type":"text" },
          { "label": "E", "value": "","type":"text" },
          { "label": "F", "value": "","type":"text" },
          { "label": "TOTAL", "value": "","type":"" }
        ]
      },
      {
        "key": "workPackage",
        "label": "Work Package",
        "data": [
          { "label": "A", "value": "","type":"text" },
          { "label": "B", "value": "","type":"text" },
          { "label": "C", "value": "","type":"text" },
          { "label": "D", "value": "","type":"text" },
          { "label": "E", "value": "","type":"text" },
          { "label": "F", "value": "","type":"text" },
          { "label": "TOTAL", "value": "","type":"" }
        ]
      },
      {
        "key": "location",
        "label": "Location",
        "data": [
          { "label": "A", "value": "","type":"text" },
          { "label": "B", "value": "","type":"text" },
          { "label": "C", "value": "","type":"text" },
          { "label": "D", "value": "","type":"text" },
          { "label": "E", "value": "","type":"text" },
          { "label": "F", "value": "","type":"text" },
          { "label": "TOTAL", "value": "","type":"" }
        ]
      }
    ];
    return comRows;

  };


  return PageModule;
});
