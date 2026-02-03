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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $application, $constants, $variables, $functions } = context;


      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_OIC/getCREWRITETR_USER_JOB_ROLES1_0UsersJobRoles',
        uriParams: {
        'p_username': $application.user.username      
        },
      });
      debugger;
      if(response.ok){
        const navigationMenuData = await $functions.getNavigationContent(response.body.items);

        $variables.restrictednavTree = navigationMenuData;
        

        
      }
    }
  }

  return vbEnterListener;
});
