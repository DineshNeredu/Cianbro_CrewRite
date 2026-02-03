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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {object} params.params
     */
    async run(context, { event, originalEvent, params }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toShell2 = await Actions.navigateToPage(context, {
        page: '/shell/crew-adhoc-combination-timesheet',
        params: {
          
          crewsetup_id:  $variables.crewsetup_id,
          crewDate: $variables.crewDate,
          crew:$variables.crew
        },
        history: 'push'
      });
    }
  }

  return ButtonActionChain1;
});
