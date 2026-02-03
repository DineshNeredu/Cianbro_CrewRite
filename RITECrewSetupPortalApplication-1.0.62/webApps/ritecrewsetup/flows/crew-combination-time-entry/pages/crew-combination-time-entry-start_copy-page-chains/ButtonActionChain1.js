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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      debugger;
      console.log($variables.combinationValues)

      const dataAsArray = await $functions.getDataAsArray($variables.combinationValues);
      if (dataAsArray) {
        let isSaved = true;
        const results = await ActionUtils.forEach(dataAsArray, async (item, index) => {
          const saveCombination = await $functions.getSaveCombination($variables.headerobj, item, $application.user.username);
          const response = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/postCrewRite_TimeEntryCombinations',
            body: saveCombination,
          });
          if(!response.ok){
            isSaved = false;
          }
        }, { mode: 'serial' });

        if (isSaved) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Combination Saved Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });
        }
        else{
           await Actions.fireNotificationEvent(context, {
            summary: 'Combination Save Failed',
            type: 'error',
            displayMode: 'transient',
          });
        }
        

      }


    }
  }

  return ButtonActionChain1;
});
