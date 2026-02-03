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

  class EditIconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;

       const resourceDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#resourceDialog',
        method: 'open',
      });

      $variables.dialogueLabel = 'Edit';
      $variables.linesObj = current.row;
      $variables.linesObj.effective_start_date_copy = current.row.effective_start_date;
      $variables.linesObj.effective_end_date_copy = current.row.effective_end_date;
      $variables.linesObj.project_number = current.row.project_number;
      // if(current.row.project_name){
      // $variables.linesObj.project_name =current.row.project_name.split('-').slice(1).join('-').trim();
      // }

     const response4 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectResourceValidation',
      });
      if(response4.ok){
        $variables.resourceADP.data = response4.body.items;
      }  
      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectSearch2',
      });
      if(response.ok){
        $variables.projectsADP.data = response.body.items;
      }

  

     
    }
  }

  return EditIconClickAction;
});
