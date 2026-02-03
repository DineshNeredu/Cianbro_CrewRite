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

  class spanClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      debugger;

      const timeEntryDailogOpen = await Actions.callComponentMethod(context, {
        selector: '#timeEntryDailog',
        method: 'open',
      });

      const datesArray = await $functions.getDatesArray(current.row.crew_week);
      let currentDate = current.columnIndex - 3;

      $variables.crew = current.row.crew_name;
      $variables.crewDate = datesArray[currentDate];
      $variables.crewsetup_id = current.row.crewsetup_id;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_MoniterResourceDetails',
        uriParams: {
          'p_crewsetup_id': current.row.crewsetup_id,
          'p_crew_date': datesArray[currentDate],
        },
      });

      if (response.ok) {
        $variables.detailsADP.data = response.body.items;
      }
    }
  }

  return spanClickChain;
});
