import axios from '../../../../../urls/api_parametrage/api'
import { asyncLoading } from 'vuejs-loading-plugin'

var housecall= require('housecall')
var queue = housecall({concurrency: 2, cooldown: 1000})


// get all structure budgetaire
export  function  getStructureBudgetaire({commit}) {
  queue.push(() =>  axios.get('/liste_document_structure_budgetaires').then((response) => {
    commit('GET_STRUCTURE_BUDGETAIRE', response.data)
    
}).catch(error => console.log(error)))
}

// ajouter structure budgetaire
export  function ajouterStructureBudgetaire({commit}, objetAjoute){
   asyncLoading( axios.post('/add_document_structure_budgetaires', {
    niveau: objetAjoute.niveau,
    code:objetAjoute.code,
    libelle: objetAjoute.libelle
} )).then(res => {
        if(res.status == 201){
            commit('AJOUTER_STRUCTURE_BUDGETAIRE', res.data)

            this.$app.$notify({
                title: 'success ',
                text: 'Enregistrement effectué avec success !',
                type:"success"
              })
        
        }
    }).catch(error => console.log(error))
}

// modifier structure budgetaire
export function modifierStructureBudgetaire({commit}, budgetaire){
   asyncLoading( axios.put('/update_document_structure_budgetaires/' + budgetaire.id, {
    niveau: budgetaire.niveau,
    code:budgetaire.code,
    libelle: budgetaire.libelle
})).then(response => {
        commit('MODIFIER_STRUCTURE_BUDGETAIRE', response.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))

}


// supprimer structure budgetaire
export function supprimerStructureBudgetaire({commit}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_STRUCTURE_BUDGETAIRE', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/delete_document_structure_budgetaires/' + id).then(() => dialog.close() )   
    })
}



// get all plan budgetaire 
export  function getPlanBudgetaire({commit}) {

    queue.push(() =>  axios.get('/liste_plan_budgetaires').then((response) => {
        commit('GET_PLAN_BUDGETAIRE', response.data)
        // console.log(response.data)
    }).catch(error => console.log(error)))


}
// ajouter plan budgetaire
export function ajouterPlanBudgetaire({commit, dispatch}, objetAjout){
   asyncLoading( axios.post('/add_plan_budgetaires',objetAjout )).then(varBudget=>{
      commit('AJOUTER_PLAN_BUDGETAIRE', varBudget.data)
      dispatch('getPlanBudgetaire')
      this.$app.$notify({
        title: 'success ',
        text: 'Enregistrement effectué avec success !',
        type:"success"
      })
        
    }).catch(error => console.log(error))

    
}


//modification plan budgetaire
export function modifierPlanbudgetaire({commit, dispatch}, planBudgetaire) {
   asyncLoading( axios.put('/update_plan_budgetaires/'+ planBudgetaire.id, {
    code:planBudgetaire.code,
    libelle:planBudgetaire.libelle,
 structure_budgetaire_id:planBudgetaire.structure_budgetaire_id
})).then(response => {
        commit('MODIFIER_PLAN_BUDGETAIRE', response.data)
        dispatch('getPlanBudgetaire')
        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))

   
}
// supprimer plan budgetaire

export function supprimerPlanBudgetaire({commit, dispatch}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_PLAN_BUDGETAIRE', id)
       dispatch('getPlanBudgetaire')
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/delete_plan_budgetaires/' + id).then(() => dialog.close() )   
    })
}

