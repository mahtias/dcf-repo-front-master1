 
 //import {groupBy} from '../../../Repositories/Repository'

 export const categories_missions = state => state.categories_missions.sort((a,b)=>(a.code>b.code)? 1:-1)

 export const imputations = state =>state.imputations.sort((a,b)=>(a.code>b.code)? 1:-1)
 
 export const missions = state => state.missions.sort((a,b)=>(a.code>b.code)? 1:-1)
 
 export const normes_missions = state => state.normes_missions
 
 // mon getters historique mission
 export const historiques_missions = state => state.historiques_missions
 
 // calcul du cout total de missions 
  export const coutTotalDemission = (state, getters) => {
   const val =  getters.missions.reduce((prec,cur) => parseFloat(prec) + parseFloat(cur.cout_total), 0)
    if(isNaN(val)) return null
    return val
  }
 
 // calcul du cout moyen de mission 
  export const coutMoyenDeMission = (state , getters) => {
 
     const coutMission = (getters.coutTotalDemission / getters.nombreTotalDeTouteMissions)
     if(isNaN(coutMission)) return null
     return coutMission
  }
 
  // calcul du nombre total de missions 
  export const nombreTotalDeTouteMissions  = state => parseFloat(state.missions.length)
 
 
  // calcul de la duree de toute les missions 
  export const dureeDeTouteLesMissions = (state, getters) => getters.missions.reduce((prec,cur) => parseFloat(prec) + parseFloat(cur.duree), 0 )
 
  
  // methode de calcul de la duree moyenne de mission
  export const dureeMoyenneDeTouteLesMissions  = (state, getters) => {
   const val = (getters.dureeDeTouteLesMissions / getters.nombreTotalDeTouteMissions).toFixed(2)
   if(isNaN(val)) return null
   return val
              
  }
 
 
 
 
 
 // calcul du cout de billet d 'avion
 
 export const coutTotalDeBilletAvion = (state, getters) => {
     const val =  getters.missions.reduce((prec,cur) => parseFloat(prec) + parseFloat(cur.cout_billet_avion), 0)
      if(isNaN(val)) return null
      return val
      
    }
   // console.log(coutTotalDeBilletAvion)
 
  export const coutMoyenDeBilletAvionDeMissions = (state, getters) => {
   const val = (getters.coutTotalDeBilletAvion / getters.nombreTotalDeTouteMissions)
    if(isNaN(val)) return null
    return val
  } 
 
 
 
 //  export const coutMoyenDeMissions = (state, getters) => {
 //    const coutMoyen = (getters.montantTotalDeToutesLesMissions / getters.nombreTotalDeTouteMissions)
 //    if(isNaN(coutMoyen)) return null
 //    return coutMoyen
 //  }
 
 // le taux de rejet de dossier de missions
  export const totalDeDossierRejetMissions = state => state.historiques_missions.filter( varDossierrejeter => varDossierrejeter.type_operation == 2).length;
 
 
  export const tauxDossierRejetMissions = (state, getters) => {
 
     const val = (getters.totalDeDossierRejetMissions * 100 / getters.nombreTotalDeTouteMissions).toFixed(2)
     if(isNaN(val)) return null
     return val
  }
  
 
 
   
 
  export  const getMissionPersonnaliser = (state, getters,rootState, rootGetters) =>
  state.missions.map(element => {
      if(element.exercice_budgetaire_id !== null && element.acte_personnel_id !== null && element.ua_id !== null  && element.source_financement_id !== null){
          element = {
              ...element,
              objetExerciceBudegetaire:rootGetters['parametreGenerauxAdministratif/exercices_budgetaires'].find(
                  exo => exo.id == element.exercice_budgetaire_id
              ),
             objetActeurDepense:rootGetters['personnelUA/all_acteur_depense' ].find(
                depens => depens.id == element.acte_personnel_id
             ),
             objetUniteAdministrative:rootGetters['uniteadministrative/uniteAdministratives'].find(
                 plans => plans.id == element.ua_id
              ),
              objetSourceFinancement:rootGetters['parametreGenerauxSourceDeFinancement/sources_financements'].find(
               norme => norme.id == element.source_financement_id
              )
          }
          
      }
      return element;
  })
 
 
 
 
 
 
 
 
 
 
  
  export  const getNormeMissionPersonnaliser = (state, getters,rootState, rootGetters) =>
  state.normes_missions.map(element => {
      if( element.fonction_id !== null   && element.source_financement_id !== null ){
          element = { 
              ...element,
              
             objetFonction:rootGetters['personnelUA/fonctions'].find(
                depens => depens.id == element.fonction_id
             ),
            
              objetSourceFinancement:rootGetters['parametreGenerauxSourceDeFinancement/sources_financements'].find(
               norme => norme.id == element.source_financement_id
              )
          }
          
      }
      return element;
  })
 
  
 
 
  export  const getHistoriqueMissionpersonnaliser = (state, getters,rootState, rootGetters) =>
  state.historiques_missions.map(element => {
      if( element.mission !== null){
          element = { 
              ...element,
              
              objetMission:rootGetters['suivi_controle_budgetaire/missions'].find(
                 plans => plans.id == element.mission
              ),
            
            
          }
          
      }
      return element;
  })
 
 
 
 
 
 
 
 
 
 //   const searchFormat = (state, getters,rootState, rootGetters) => {
 //     return (exercice, ua, acteur) => getters.getMissionPersonnaliser.filter(item =>{
 //         if(exercice && ua && acteur){
 //             return item.exerciceBu.id === exercice 
 //             && item.exoDepense.id === acteur
 //             && item.exoplans.id === ua
 
 //         }else if(exercice && ua && !acteur){
 //             return item.exerciceBu.id === exercice 
 //             && item.exoplans.id === ua
 //         }else if(exercice && !ua && !acteur){
 //             return item.exerciceBu.id === exercice 
            
 //         }else if(exercice && !ua && acteur){
 //             return item.exerciceBu.id === exercice 
 //             && item.exoDepense.id === acteur
 //         }
 //     });
 //   }
 