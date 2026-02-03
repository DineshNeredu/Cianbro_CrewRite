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

  class InputNumberValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {number} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if ($variables.crewApplicationControlObj.p_bonus_dm_hour && $variables.crewApplicationControlObj.p_bonus_map_rate) {
        $variables.crewApplicationControlObj.p_bonus_map_amount = $variables.crewApplicationControlObj.p_bonus_dm_hour * $variables.crewApplicationControlObj.p_bonus_map_rate;
      }

      
    }
  }

  return InputNumberValueChangeChain;
});
