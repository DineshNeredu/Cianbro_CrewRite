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

  class TR_DefaultProjectsButton extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $variables, $functions } = context;

      debugger;

      $page.variables.defaultCheck = true;
      $page.variables.dialogLabel = 'Default';

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.updateProjects',
        ],
      });

      // const callComponentMethodEditProjectDetailsOpenResult = await Actions.callComponentMethod(context, {
      //   selector: '#editProjectDetails',
      //   method: 'open',
      // });




      $page.variables.updateProjects = current;
      $page.variables.defaultProjects.project_name = $page.variables.updateProjects.project_name;
      $page.variables.defaultProjects.project_number = $page.variables.updateProjects.project_number;
      $page.variables.defaultProjects.resource_number = $page.variables.updateProjects.resource_number;
      $page.variables.defaultProjects.resource_name = $page.variables.updateProjects.resource_name;
      $page.variables.defaultProjects.ot_shift_name = $page.variables.updateProjects.ot_shift_name;
      $page.variables.defaultProjects.time_entry_method = $page.variables.updateProjects.time_entry_method;

      $page.variables.defaultProjects.project_id = $page.variables.updateProjects.project_id;
      
      $page.variables.defaultProjects.week_start_day = $page.variables.custDetailsObj.week_start_day;
      $page.variables.defaultProjects.week_end_day = $page.variables.custDetailsObj.week_end_day;
      $page.variables.defaultProjects.no_of_days = $page.variables.custDetailsObj.no_of_days;
      $page.variables.defaultProjects.ot_allowed = $page.variables.custDetailsObj.ot_allowed;
      $page.variables.defaultProjects.ot_threshold_measure = $page.variables.custDetailsObj.ot_threshold_measure;
      $page.variables.defaultProjects.ot_threshold_limit = $page.variables.custDetailsObj.ot_threshold_limit;
      $page.variables.defaultProjects.active_flag = $page.variables.custDetailsObj.active_flag;
      $page.variables.defaultProjects.billing_frequency = $page.variables.custDetailsObj.billing_frequency;
      $page.variables.defaultProjects.effective_start_date = $page.variables.custDetailsObj.effective_start_date;
      $page.variables.defaultProjects.effective_end_date = $page.variables.custDetailsObj.effective_end_date;
      $page.variables.defaultProjects.per_diem = $page.variables.custDetailsObj.per_diem;
      $page.variables.defaultProjects.bonus = $page.variables.custDetailsObj.bonus;
      $page.variables.defaultProjects.safety_bonus = $page.variables.custDetailsObj.safety_bonus;

      // Added by Madhu - to get header values to update projects


      const projectPayload = await $functions.getProjectsUpdatePayload($variables.custDetailsObj, $variables.defaultProjects, $application.user.username);
       

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/putCrewRite_ProjectSearch',
       // body: $variables.defaultProjects,
         body: projectPayload,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Default Projects Updated Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
        if(!current.customer_id){
          current.customer_id = $variables.customer_id;
        }
        await Actions.callChain(context, {
          chain: 'TR_SearchCustomerValChangeAction',
          params: {
            data: current,
          },
        });
        
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Default Project Update Failed',
          displayMode: 'transient',
          type: 'error',
        });

      }

      




      
    }
  }

  return TR_DefaultProjectsButton;
});
