 
 //import {groupBy} from '../../../Repositories/Repository'
export const engagements = state => state.engagements

export const procedures = state => state.procedures







// export  const getEngagement = (state, getters,rootState, rootGetters) =>
// state.missions.map(element => {
//     if(element.exercice_budgetaire_id !== null && element.acte_personnel_id !== null && element.ua_id !== null  && element.source_financement_id !== null){
//         element = {
//             ...element,
//             objetExerciceBudegetaire:rootGetters['parametreGenerauxAdministratif/exercices_budgetaires'].find(
//                 exo => exo.id == element.exercice_budgetaire_id
//             ),
//            objetActeurDepense:rootGetters['personnelUA/marche_contrats' ].find(
//               depens => depens.id == element.acte_personnel_id
//            ),
//            objetUniteAdministrative:rootGetters['uniteadministrative/uniteAdministratives'].find(
//                plans => plans.id == element.ua_id
//             ),
//             objetSourceFinancement:rootGetters['parametreGenerauxSourceDeFinancement/sources_financements'].find(
//              norme => norme.id == element.source_financement_id
//             )
//         }
        
//     }
//     return element;
// })
