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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_MoniteringSearch2',
        uriParams: {
          'p_supervisor_id': $variables.moniter.supervisor_id?$variables.moniter.supervisor_id:'',
          'p_crewsetup_id': $variables.moniter.crewsetup_id? $variables.moniter.crewsetup_id:'',
          'p_crew_week': $variables.moniter.week?$variables.moniter.week:'',
        },
      });

      if (response.ok) {
        $variables.crewMonitorADP.data = response.body.items;
      }

      const response2 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_DashboardCount',
        uriParams: {
          'p_crew_week': $variables.moniter.week,
          'p_crewsetup_id': $variables.moniter.crewsetup_id,
        },
      });

      if (response2.ok) {
        $variables.dashObj = response2.body.items[0];
      }
    }
  }

  return ButtonActionChain;
});
