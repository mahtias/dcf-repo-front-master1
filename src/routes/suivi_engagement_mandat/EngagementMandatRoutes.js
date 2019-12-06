
import Engagement from '../../pages/suivi_engagement_mandat/Engagement.vue';
import AjouterEngagement from '../../pages/suivi_engagement_mandat/AjouterEngagement.vue';
const suiviEngagementMandatRoutes = [

  {
      path:"/engagement",
      name:"Engagement",
      component:Engagement
  },
  {
      path:"/creation-engagement",
      name:"AjouterEngagement",
      component:AjouterEngagement
  }






]

export default suiviEngagementMandatRoutes;