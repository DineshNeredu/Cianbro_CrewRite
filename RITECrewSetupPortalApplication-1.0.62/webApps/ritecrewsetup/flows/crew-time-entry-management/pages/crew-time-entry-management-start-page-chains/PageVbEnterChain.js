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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const populateDateRangeJS = await $application.functions.populateDateRangeJS();
      $variables.dateRangeADP.data = populateDateRangeJS.dateRange;
       $variables.timeEntryObj.week = populateDateRangeJS.week;



       

      
      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_StatusDetailsSearch',
        uriParams: {
          'page_name': 'crew-time-entry-management',
        },
      });

      if(response.ok){
        $variables.crewStatusADP.data= response.body.items;
      }

      const response1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetCustomerDetails',
      });

      $variables.CrewNameLOVSDP.data = response1.body.items;
    }
  }

  return PageVbEnterChain;
});
