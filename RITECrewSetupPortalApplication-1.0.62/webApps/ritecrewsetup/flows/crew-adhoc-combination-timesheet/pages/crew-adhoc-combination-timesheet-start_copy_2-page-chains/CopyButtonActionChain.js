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

  class CopyButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($variables.headerobj.crewDate !== $variables.copyObj.date) {

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntry',
          uriParams: {
            'p_crewsetup_id': $variables.headerobj.setupId,
            'p_crew_date': $functions.formatDate($variables.copyObj.date),
          },
        });

        if (response.ok && response.body.items.length >= 1) {


          const copyDialogClose = await Actions.callComponentMethod(context, {
            selector: '#copy-dialog',
            method: 'close',
          });

          $variables.mainTimeEntriesTableADP.data = response.body.items;
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data Found',
            type: 'info',
            displayMode: 'transient',
          });

        }

        await Actions.resetVariables(context, {
          variables: [
    '$variables.copyObj',
  ],
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          type: 'error',
          displayMode: 'transient',
          summary: 'The Crew Date and the Copy Date must be distinct',
          message: 'Please Select Another Date',
        });

      }
    }
  }

  return CopyButtonActionChain;
});
