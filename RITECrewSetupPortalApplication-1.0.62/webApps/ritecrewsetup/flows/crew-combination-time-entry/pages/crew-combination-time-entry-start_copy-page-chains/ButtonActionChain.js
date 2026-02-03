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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      
      

       const nextChar = String.fromCharCode(65 + $variables.dynamicCols.length -1);

      $variables.dynamicCols.push({
        "headerText": nextChar,
        "field": nextChar,
        "template":"common"
      });   
         $variables.dynamicCols_timesheet.splice($variables.dynamicCols_timesheet.length -1, 0 ,{
        "headerText": nextChar,
        "field": nextChar,
        "template":"common"
      });   
     
      const newRowData = await $functions.getNewSetofRows($variables.dynamicADP.data, nextChar);
      const newRowDataNew = await $functions.getNewSetofRows($variables.dynamicADP_New.data, nextChar);
      $variables.dynamicADP_New = await $functions.getADPData(newRowDataNew);

      
      
       
     
    }
  }

  return ButtonActionChain;
});
