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

  class AssignButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($variables.selectedResoursesArr.length>=1) {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });



        const buildTimeEntryObjects = await $functions.buildTimeEntryObjects($variables.selectedResoursesArr, $variables.tempCombinationRowObj);
       
        const response1 = await Actions.callRest(context, {
          endpoint: 'Distaince/getUsPostalCode',
          uriParams: {
            postalCode: $variables.selectedResoursesArr[0].location1,
          },
        });
        const response2 = await Actions.callRest(context, {
          endpoint: 'Distaince/getUsPostalCode',
          uriParams: {
            postalCode: $variables.selectedResoursesArr[0].location2,
          },
        });
        if(response1 && response2){
          buildTimeEntryObjects[0].milage = await $functions.calculateDistance(response1.body.places[0].latitude,response1.body.places[0].longitude,response2.body.places[0].latitude,response2.body.places[0].longitude);
        }
       
        await Actions.fireDataProviderEvent(context, {
          target: $variables.mainTimeEntriesTableADP,
          add: {
            data: buildTimeEntryObjects,
          },
        });
        await Actions.callChain(context, {
          chain: 'SaveIconClickChain',
          params: {
            current: $variables.tempCombinationRowObj,
          },
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const ojDialogCombinationResourceMappingClose = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-Combination-Resource-Mapping',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.selectedResource',
  ],
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select Resources',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return AssignButtonActionChain;
});
