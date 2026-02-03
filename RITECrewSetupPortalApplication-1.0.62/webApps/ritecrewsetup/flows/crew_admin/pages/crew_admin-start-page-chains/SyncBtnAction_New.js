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

  class SyncBtnAction_New extends ActionChain {

    async run(context) {
      const { $variables, $functions } = context;


      const syncValue = await $functions.getSyncValue($variables.selectedSyncFields);
      let isIntegrationPass = true;

      await ActionUtils.forEach(syncValue, async (item) => {

        if (item === 'Projects') {

          $variables.isLoader = true;
          try {
            const response = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/postCREWRITETRORACLEPROJECTDETAILS1_0TROracleProjects',
            });
            if (!response.ok) {
              isIntegrationPass = false;
            }
          } catch (e) {
            console.error('Projects failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

        else if (item === 'Customers') {

          $variables.isLoader = true;
          try {
            const response6 = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/postCREWRITETRORACLECUSTOMERSDETAILS1_0TROracleCustomers',
            });
            if (!response6.ok) { isIntegrationPass = false; }
          } catch (e) {
            console.error('Customers failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }
          else if (item === 'Time Types') {

          $variables.isLoader = true;
          try {
            const response8 = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/postCREWRITETRORACLETIMETYPEDETAILS1_0GetTimeTypes',
            });
            if (!response8.ok) { isIntegrationPass = false; }
          } catch (e) {
            console.error('Time Types failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

        else if (item === 'Oracle Jobs') {

          $variables.isLoader = true;
          try {
            const response2 = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/getCREWRITETRORACLEJOBDETAILS1_0TROracleJobs',
            });
            if (!response2.ok) { isIntegrationPass = false; }
          } catch (e) {
            console.error('Jobs failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

        else if (item === 'Oracle Departments') {

          $variables.isLoader = true;
          try {
            const response3 = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/getCREWRITETRORACLEDEPARTMENTDETAILS1_0TROracleDepartments',
            });
            if (!response3.ok) { isIntegrationPass = false; }
          } catch (e) {
            console.error('Departments failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

        else if (item === 'Project Team Members') {

          $variables.isLoader = true;
          try {
            const response4 = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/getCREWRITETRORACLEPROJECTTEAMDETAILS1_0TROracleProjectsTeam',
            });
            if (!response4.ok) { isIntegrationPass = false; }
          } catch (e) {
            console.error('Team failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

        else if (item === 'Contracts') {

          $variables.isLoader = true;
          try {
            const response7 = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/postCREWRITETRORACLECONTRACTSDETAILS1_0TROracleContracts',
            });
            if (!response7.ok) { isIntegrationPass = false; }
          } catch (e) {
            console.error('Contracts failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

        else if (item === 'Oracle Employees') {

          $variables.isLoader = true;
          try {
            const response12 = await Actions.callRest(context, {
              endpoint: 'CrewRite_OIC/postCREWRITETRORACLEEMPLOYEEDETAILS1_0GetEmpDetails',
            });
            if (!response12.ok) { isIntegrationPass = false; }
          } catch (e) {
            console.error('Employees failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

        else if (item === 'All') {

          $variables.isLoader = true;

          try {

            const endpoints = [
              'CrewRite_OIC/postCREWRITETRORACLEPROJECTDETAILS1_0TROracleProjects',
              'CrewRite_OIC/postCREWRITETRORACLECUSTOMERSDETAILS1_0TROracleCustomers',
              'CrewRite_OIC/getCREWRITETRORACLEJOBDETAILS1_0TROracleJobs',
              'CrewRite_OIC/getCREWRITETRORACLEDEPARTMENTDETAILS1_0TROracleDepartments',
              'CrewRite_OIC/getCREWRITETRORACLEPROJECTTEAMDETAILS1_0TROracleProjectsTeam',
              'CrewRite_OIC/postCREWRITETRORACLECONTRACTSDETAILS1_0TROracleContracts',
              'CrewRite_OIC/postCREWRITETRORACLEEMPLOYEEDETAILS1_0GetEmpDetails',
              'CrewRite_OIC/postCREWRITETRORACLETIMETYPEDETAILS1_0GetTimeTypes'
            ];

            for (const ep of endpoints) {
              const res = await Actions.callRest(context, { endpoint: ep });
              if (!res.ok) { isIntegrationPass = false; }
            }

          } catch (e) {
            console.error('All failed', e);
            isIntegrationPass = false;
          } finally {
            $variables.isLoader = false;
          }

        }

      }, { mode: 'serial' });

      if (isIntegrationPass) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Sync Completed',
          type: 'confirmation',
          displayMode: 'transient',
        });
      }

    }
  }

  return SyncBtnAction_New;
});
