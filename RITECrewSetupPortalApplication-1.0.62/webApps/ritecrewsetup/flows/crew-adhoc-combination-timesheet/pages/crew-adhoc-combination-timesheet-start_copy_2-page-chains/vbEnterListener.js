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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;


      // const response = await Actions.callRest(context, {
      //   endpoint: 'FSCM_REST_API/getProjectsLOV',
      //   uriParams: {
      //     fields: 'ProjectId,ProjectName,ProjectNumber,ProjectStatus',
      //     onlyData: 'true',
      //     limit: '50',
      //   },
      // });

      // $variables.projectsLOV.data = response.body.items;

      debugger;
      if ($variables.crewsetup_id && $variables.crewDate) {
        $variables.headerobj.crewname = $variables.crew;
        $variables.headerobj.setupId = $variables.crewsetup_id;
        const toIsoMidnightUTC = await $functions.toIsoMidnightUTC($variables.crewDate);
        $variables.headerobj.crewDate = toIsoMidnightUTC;

        await Actions.callChain(context, {
          chain: 'searchButtonActionChain',
        });


      }

    }
  }

  return vbEnterListener;
});
