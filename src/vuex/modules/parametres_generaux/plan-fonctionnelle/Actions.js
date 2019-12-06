import axios from '../../../../../urls/api_parametrage/api'
import { asyncLoading } from 'vuejs-loading-plugin'

 var housecall= require('housecall')
 var queue = housecall({concurrency: 2, cooldown: 1000})

// liste structure fonctionnelle

export  function getStructureFonctionnelle({commit}){
    queue.push(() => axios.get('/liste_Structure_fontionnelle').then(tony => {
        commit('GET_STRUCTURE_FONCTIONNELLE', tony.data)
    }).catch(error => console.log(error)))
}

// ajouter structure fonctionnelle
export function ajouterStructureFonctionnelle({commit}, objetAjout){
 asyncLoading(axios.post('/ajouter_Structure_fontionnelle' ,{
    niveau:objetAjout.niveau,
    libelle:objetAjout.libelle,
    
})).then(tony => {
     if(tony.status == 201){
         commit('AJOUTER_STRUCTURE_FONCTIONNELLE', tony.data)

         this.$app.$notify({
            title: 'success ',
            text: 'Enregistrement effectué avec success !',
            type:"success"
          })
     }
 }).catch(error => console.log(error))
}
// supprimer structure fonctionnelle
export function supprimerStructureFonctionnelle({commit}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_STRUCTURE_FONCTIONNELLE', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/supprimer_Structure_fontionnelle/' + id).then(() => dialog.close() )   
    })
}
//modifier structure fonctionnelle
export function modifierStructureFonctionnelle({commit}, source_financement){

   asyncLoading( axios.put('/modifier_Structure_fontionnelle/' + source_financement.id ,{
    niveau:source_financement.niveau,
    libelle:source_financement.libelle,

})).then(response => {
        commit('MODIFIER_STRUCTURE_FONCTIONNELLE', response.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
   
}

// get all of plan fonctionnelle
export  function getPlanFonctionnelle({commit}){
    queue.push(()=> axios.get('/liste_Planfontionnelle').then(tony => {
        commit('GET_PLAN_FONCTIONNELLE', tony.data)
    }).catch(error => console.log(error)))
    
}

// ajouter plan fonctionnelle
export function ajouterPlanFonctionnel({commit, dispatch}, objetAjout){
   asyncLoading( axios.post('/ajouter_Planfontionnelle', objetAjout)).then(res => {
        commit('AJOUTER_PLAN_FONCTIONNELLE', res.data)
        dispatch('getPlanFonctionnelle')
        this.$app.$notify({
            title: 'success ',
            text: 'Enregistrement effectué avec success !',
            type:"success"
          })
          
    }).catch(error => console.log(error))
}
// modifier plan fonctionnelle

export function modifierPlanFonctionnel({commit, dispatch},plan_fonctionnel){
   asyncLoading( axios.put('/modifier_Planfontionnelle/' + plan_fonctionnel.id, {
    code:plan_fonctionnel.code,
    libelle:plan_fonctionnel.libelle ,
    structure_fonctionnelle_id:plan_fonctionnel.structure_fonctionnelle_id
  } )).then(res => {
        commit('MODIFIER_PLAN_FONCTIONNELLE', res.data)
        dispatch('getPlanFonctionnelle')

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
}
// supprimer plan fonctionnelle
export function supprimerPlanFonctionnel({commit, dispatch}, id){
    
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_PLAN_FONCTIONNELLE', id)
       dispatch('getPlanFonctionnelle')

      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/supprimer_Planfontionnelle/' + id).then(() => dialog.close() )   
    })
}