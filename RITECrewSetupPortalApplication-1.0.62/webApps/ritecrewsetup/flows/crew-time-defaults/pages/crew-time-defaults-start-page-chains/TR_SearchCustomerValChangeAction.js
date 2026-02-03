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

  class TR_SearchCustomerValChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables, $functions } = context;
      debugger;
      await Actions.resetVariables(context, {
        variables: [
    '$variables.custDetailsObj',
  ],
      });
     
      if (data) {
        // debugger; 
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.contractsADP',
            '$page.variables.ProjectsTblADP',
          
          ],
        });
        // $variables.custDetailsObj.customer_number = data.customer_number;
        if(data){
         $variables.customer_id = data.customer_id;
        }
      

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_CustomerSearch',
          uriParams: {
            'p_customer_id': $variables.customer_id,
          },
        });
// CrewRite_ORDS/getCrewRite_ContractSearch
        $variables.custDetailsObj = response.body.items[0];

        const response4 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_ContractSearch',
          uriParams: {
            'p_customer_id': $variables.customer_id,
          },
        });

      const customerDtls = await $functions.getCustomerDtls(response4.body.items);
        $variables.contractsADP.data = customerDtls;
        // const result = await $functions.hasValidEffectiveStartDates(response4.body.items);

        // if (result) {
         
        // } else {

        //   const response3 = await Actions.callRest(context, {
        //     endpoint: 'CrewRite_ORDS/getCrewRite_ContractDetails',
        //     uriParams: {
        //       'p_customer_id': data.customer_id,
        //     },
        //   });

        //   $page.variables.contractsADP.data = response3.body.items;
          

        // }




      }



      // const callRestTimeRiteOrdsServiceCustDetailsResult = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/CustDetails',
      //   uriParams: {
      //     'customer_number': data.customer_number,
      //   },
      // });







      const refreshProjDtls = await Actions.callComponentMethod(context, {
        selector: '#project_details',
        method: 'refresh',
      });



      // const response2 = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/getGetContractDetails',
      //   uriParams: {
      //     'CUSTOMER_NUMBER': data.customer_number,
      //   },
      // });

      // if (response2.ok) {
      //   $page.variables.contractsADP.data = response2.body.items;
      // }
      // else{
      //   await Actions.fireNotificationEvent(context, {
      //     displayMode: 'transient',
      //     summary: 'Unable to Fetch Contract Details',
      //     type: 'warning',
      //   });

      // }
    }
  }

  return TR_SearchCustomerValChangeAction;
});
