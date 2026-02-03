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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectSearch2',
      });

      $variables.projectADP.data = response.body.items;

     
    }
  }

  return PageVbEnterChain;
});
