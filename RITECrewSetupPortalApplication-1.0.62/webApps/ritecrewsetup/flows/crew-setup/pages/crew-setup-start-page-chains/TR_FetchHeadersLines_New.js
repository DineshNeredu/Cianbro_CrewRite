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

  class TR_FetchHeadersLines_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      debugger;

      $variables.IsEdit = false;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.crewSetupHeaderObj',
  ],
      });
     

      // const response = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/getGetCrewSetupHeader',
      //   uriParams: {
      //     'CREW_NAME': $variables.searchCrew,
      //   },
      // });

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_CrewSetup',
        uriParams: {
          'p_crew_name': $variables.searchCrew,
        },
      });


      
      if (response.ok &&  response.body.items.length!==0) {

         

        const response3 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_ResourceDetails',
        });

      let objName = await $functions.getPersonNameNew(response3.body.items, response.body.items[0].primary_timekeeper_id,response.body.items[0].secondary_timekeeper_id,response.body.items[0].supervisor);
          
        $variables.primary_timekeeper_name =  objName.primary_name;
        $variables.secondery_timekeeper_name =  objName.second_name;
        $variables.supervisor_name =   objName.super_name;

        $variables.crewSetupHeaderObj =  response.body.items[0];
        $variables.crewSetupHeaderObj.start_date_new = response.body.items[0].start_date;
        $variables.crewSetupHeaderObj.end_date_new = response.body.items[0].end_date;
        
       
        
        $variables.IsSearch = true;
        if ($page.variables.crewSetupHeaderObj.crewsetup_id) {
          await Actions.resetVariables(context, {
            variables: [
    '$variables.crewSetupLinesADP',
  ],
          });

          const response2 = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/getCrewRite_CrewSetupLines',
            uriParams: {
              'p_crewsetup_id': $variables.crewSetupHeaderObj.crewsetup_id,
            },
          });

          // const response2 = await Actions.callRest(context, {
          //   endpoint: 'TimeRite_Ords_Service/getGetCrewSetUpLines2',
          //   uriParams: {
          //     'crewsetup_id': $variables.crewSetupHeaderObj.crewsetup_id,
          //     'resource_id': $variables.searchresourceid,
          //   },
          // });

          
          if (response2.ok) {
            //if ($page.variables.AssignEnabled) {
              $variables.crewSetupLinesADP.data = response2.body.items;
              $variables.linesObj = response2.body.items[0];

              //const resourceDialogOpen = await Actions.callComponentMethod(context, {
               // selector: '#resourceDialog',
               // method: 'open',
              //});
           // }
          }

          
        }
        

      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Headers',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return TR_FetchHeadersLines_New;
});
