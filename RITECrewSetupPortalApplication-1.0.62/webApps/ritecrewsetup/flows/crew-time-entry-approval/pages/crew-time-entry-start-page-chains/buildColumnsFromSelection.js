define([
  'vb/action/actionChain'
], (
  ActionChain
) => {
  'use strict';

  class buildColumnsFromSelection extends ActionChain {


    async run(context, params) {
      const { selectedFields, columnOptions } = params;

      if (!Array.isArray(selectedFields) || !Array.isArray(columnOptions)) {
        return [];
      }

      return selectedFields
        .map(field => columnOptions.find(col => col.field === field))
        .filter(Boolean);
    }
  }

  return buildColumnsFromSelection;
});
