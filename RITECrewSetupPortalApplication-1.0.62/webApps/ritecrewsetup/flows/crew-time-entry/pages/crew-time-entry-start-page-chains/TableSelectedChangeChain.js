define(['vb/action/actionChain'], (ActionChain) => {
  'use strict';

  class TableSelectedChangeChain extends ActionChain {
    async run(context, { value }) {
      const { $variables } = context;


      const selectedIds = Array.from(value.row.keys.keys);


      $variables.selectedRows =
        $variables.SearchTimeSheetADP.data.filter(
          row => selectedIds.includes(row.time_entry_id)
        );

    }
  }

  return TableSelectedChangeChain;
});
