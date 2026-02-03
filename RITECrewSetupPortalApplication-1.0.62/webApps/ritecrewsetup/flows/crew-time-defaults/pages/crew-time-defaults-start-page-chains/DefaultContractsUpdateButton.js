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

  class DefaultContractsUpdateButton extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables, $functions } = context;

      const callFunctionResult = await $application.functions.validateGroup('contractsValidgroup');

      if (callFunctionResult === 'valid') {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        $page.variables.defaultContracts.ot_allowed = $page.variables.defaultContracts.ot_allowed === true ? true : false;
        $page.variables.defaultContracts.active_flag = $page.variables.defaultContracts.active_flag === true ? true : false;

        $variables.defaultContracts.effective_start_date = $functions.formatDateWithoutTimezone($variables.defaultContracts.effective_start_date);
        
          $variables.defaultContracts.effective_end_date = $functions.formatDateWithoutTimezone($variables.defaultContracts.effective_end_date);
        // const callRestTimeRiteOrdsServicePutUpdateContractDetailsResult = await Actions.callRest(context, {
        //   endpoint: 'TimeRite_Ords_Service/putUpdateContractDetails',
        //   body: $page.variables.defaultContracts,
        // });

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/postCrewRite_ContractDetails',
          body: $variables.defaultContracts,
        });

        if (response.ok) {
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Default Contracts Updated Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });
        
        const response4 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_CustomerSearch',
          uriParams: {
            'p_customer_number': $variables.custDetailsObj.customer_number,
          },
        });

        // const response3 = await Actions.callRest(context, {
        //   endpoint: 'CrewRite_ORDS/getCrewRite_ContractDetails',
        //   uriParams: {
        //     'p_customer_id': $variables.custDetailsObj.customer_id,
        //   },
        // });

          const response5 = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/getCrewRite_ContractSearch',
            uriParams: {
              'p_customer_id': $variables.custDetailsObj.customer_id,
            },
          });

        $variables.custDetailsObj = response4.body.items[0];

        
        $page.variables.contractsADP.data = response5.body.items;

          const callComponentMethodEditContractDetailsCloseResult = await Actions.callComponentMethod(context, {
            selector: '#editContractDetails',
            method: 'close',
          });
        }else{
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Update Contract',
            type: 'error',
            displayMode: 'transient',
          });
          
        }
      }
    }
  }

  return DefaultContractsUpdateButton;
});
