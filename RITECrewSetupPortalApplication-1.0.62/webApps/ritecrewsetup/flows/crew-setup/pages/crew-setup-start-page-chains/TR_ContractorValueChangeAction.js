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

  class TR_ContractorValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;
      debugger;

      if (data.contract_number) {

        
        $page.variables.crewSetupHeaderObj.contract_id = data.contract_id;

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_ProjectSearch2',
          uriParams: {
            'contract_id': data.contract_id,
          },
        });

        if (response.ok) {         
           $variables.projectNameADP.data = response.body.items;        
        }





        
       
        
      }
    }
  }

  return TR_ContractorValueChangeAction;
});
