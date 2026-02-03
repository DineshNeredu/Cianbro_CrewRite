define([
'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
  'ojs/ojrowdatagridprovider',
  'ojs/ojbufferingdataprovider'
], (
  ActionChain,
  Actions,
  ActionUtils,
  RowDataGridProvider,
  BufferingDataProvider
) => {
  'use strict';

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context) {
      const { $page, $flow, $application, $functions, $variables } = context;

function getRowGridDataProvider(sdp) {
        $page.variables.bufferingDP = new BufferingDataProvider(sdp);
         $page.variables.bufferingDP.addEventListener("submittableChange", (event) => {
          const submittableRows = event.detail;
           showSubmittableItems(submittableRows);
         });

        return new RowDataGridProvider.RowDataGridProvider($page.variables.bufferingDP, {
          columns: {
            rowHeader: ["crewtype"],
            databody: $page.variables.dataColumnNames
          },
          columnHeaders: {
            column: $variables.colsarray
          }
        });
      }

      function showSubmittableItems(submittableRows) {
        let textarea = document.getElementById("bufferContent");
        let textValue = "";
        submittableRows.forEach((editItem) => {
          textValue += "Operation: " + editItem.operation + ", ";
          textValue += "Row ID: " + editItem.item.data.id;
          if (editItem.item.metadata.message) {
            textValue +=
              " error: " + JSON.stringify(editItem.item.metadata.message);
          }
          textValue += "\n";
        });
        textarea.value = textValue;
      }

      const data = await $functions.getData();

      $variables.abcBDP.data = data;
      

      // call getRowGridDataProvider
      const rowGridDataProvider = await getRowGridDataProvider($variables.abcBDP);
      $page.variables.data = rowGridDataProvider;
      const tableData = await $functions.getTableData();
      const aDPData = await $functions.getADPData(tableData);
      $variables.dynamicADP = aDPData;
      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectSearch2',
      });
      $variables.projectADP.data = response.body.items;
    //  const timeSheetData = await $functions.getTimeSheetData();
      const aDPTablekData = await $functions.getADPTablekData([]);

      $variables.dynamicADP_New = aDPTablekData;

      


    }
  }

  return PageVbEnterChain;
});
