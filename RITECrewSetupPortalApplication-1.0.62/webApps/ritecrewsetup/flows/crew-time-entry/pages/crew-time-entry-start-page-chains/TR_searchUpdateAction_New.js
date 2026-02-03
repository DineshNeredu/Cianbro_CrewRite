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

  class TR_searchUpdateAction_New extends ActionChain {

    /**
     * Update / Edit / Add Timesheet Action
     * @param {Object} context
     */
    async run(context) {
      const { $application, $variables } = context;

      
      let validationGroupId;

      if ($variables.EditType === 'SEARCH') {
        validationGroupId = 'updateSearchformvalidation';
      } else if (
        $variables.EditType === 'ADD' ||
        $variables.EditType === 'UPDATE'
      ) {
        validationGroupId = 'updateformvalidation';
      } else {
        console.error('Unknown EditType:', $variables.EditType);
        return;
      }

      
      const validateResult =
        $application.functions.validateGroup(validationGroupId);

      console.log('Validation Result:', validateResult);

      if (validateResult !== 'valid') {
        return; 
      }


      const timeValidationResult =
        $application.functions.timeValidator($variables.SearchRowdata);

      if (!timeValidationResult || !timeValidationResult.isValid) {
        return;
      }

    
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/putUpdateheaderSet',
        uriParams: {
          crewsetup_id: $variables.SearchRowdata.crewsetup_id,
          crewsetup_line_id: $variables.SearchRowdata.crewsetup_line_id,
          time_entry_id: $variables.SearchRowdata.time_entry_id,
        },
        body: $variables.SearchRowdata,
      });

     
      if (response && response.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'TimeSheet updated successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });

        await Actions.callComponentMethod(context, {
          selector: '#timesDialog',
          method: 'close',
        });

        await Actions.resetVariables(context, {
          variables: ['$variables.SearchRowdata'],
        });

        await Actions.callChain(context, {
          chain: 'TR_fetchSearchSheetData_New',
        });

      } else {

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to update Timesheet',
          type: 'error',
          displayMode: 'transient',
        });

      }
    }
  }

  return TR_searchUpdateAction_New;
});
