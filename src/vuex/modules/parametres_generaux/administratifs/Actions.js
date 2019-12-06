import axios from '../../../../../urls/api_parametrage/api'
import { asyncLoading } from 'vuejs-loading-plugin'

var housecall= require('housecall')
var queue = housecall({concurrency: 2, cooldown: 1000})


// get all titres
export  function  getTitres({commit}) {
  queue.push(() =>  axios.get('/liste_titre').then((response) => {
    commit('GET_TITRES', response.data)
    
}).catch(error => console.log(error)))
}


// ajouter titre
export  function ajouterTitre({commit}, objetAjoute){
   asyncLoading( axios.post('/add_titre', {
    code: objetAjoute.code,
    libelle: objetAjoute.libelle
} )).then(res => {
        if(res.status == 201){
            commit('AJOUTER_TITRE', res.data)

            this.$app.$notify({
                title: 'success ',
                text: 'Enregistrement effectué avec success !',
                type:"success"
              })
        
        }
    }).catch(error => console.log(error))
}

// supprimer titre
export function supprimerTitre({commit}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_TITRE', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/delete_titre/' + id).then(() => dialog.close() )   
    })
}

// modifier titre 
export function modifierTitre({commit}, titre){
   asyncLoading( axios.put('/update_titre/' + titre.id, {
    code: titre.code,
    libelle: titre.libelle
})).then(response => {
        commit('MODIFIER_TITRE', response.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))

}

// get all exercices budgetaires 
export  function getExercicesBudgetaires({commit}) {

    queue.push(() =>  axios.get('/liste_exercice_budgetaire').then((response) => {
        commit('GET_EXERCICES_BUDGETAIRES', response.data)
        
    }).catch(error => console.log(error)))


}
// ajouter execice budgetaire
export function ajouterExerciceBudgetaire({commit}, objetAjout){
  asyncLoading(  axios.post('/add_exercice_budgetaire',{
    annee: objetAjout.annee,
     date_debut:objetAjout.date_debut,
     date_fin:objetAjout.date_fin,
     encours:objetAjout.encours,
      
  })).then(varExerciceBudgetaire=>{
        if(varExerciceBudgetaire.status == 201)
        {
            
    commit('AJOUTER_EXERCICE_BUDGETAIRES', varExerciceBudgetaire.data)

            this.$app.$notify({
                title: 'success ',
                text: 'Enregistrement effectué avec success !',
                type:"success"
              })
        }
    }).catch(error => console.log(error))
}

//modification exercice budgetaire
export function modifierExerciceBudgetaire({commit}, exercice_budgetaire) {

    asyncLoading(axios.put('/update_exercice_budgetaire/'+ exercice_budgetaire.id,{
        annee:exercice_budgetaire.annee,
        date_debut:exercice_budgetaire.date_debut,
        date_fin:exercice_budgetaire.date_fin,
        encours:exercice_budgetaire.encours
    })).then(response => {
        commit('MODIFIER_EXERCICE_BUDGETAIRE', response.data)
        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
   
}


// supprimer exercice budgetaire

export function supprimerExerciceBudgetaire({commit}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_EXERCICE_BUDGETAIRE', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/delete_exercice_budgetaire/' + id).then(() => dialog.close() )   
    })
}

// get all nature de section
export  function getNatureSection({commit}) {

    queue.push(() =>  axios.get('/liste_nature_section').then((response) => {
        commit('GET_NATURE_SECTION', response.data)      
    }).catch(error => console.log(error)))
 
   
}

// ajouter nature de section
export function ajouterNatureSection({commit},objetAjout){
   asyncLoading( axios.post('/ajouter_nature_section',{
    code:objetAjout.code,
    libelle:objetAjout.libelle

})).then(response => {
        if(response.status == 201){
            commit('AJOUTER_NATURE_SECTION', response.data)

            this.$app.$notify({
                title: 'success ',
                text: 'Enregistrement effectué avec success !',
                type:"success"
              })
        }
    }).catch(error => console.log(error))

}
// modififer nature de section
export function modifierNatureSection({commit}, objetModifie){
  asyncLoading(  axios.put('/modifier_nature_section/'+ objetModifie.id,{

    code:objetModifie.code,
    libelle:objetModifie.libelle
})).then(res => {
        commit('MODIFIER_NATURE_SECTION', res.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
   
}
// supprimer nature de setion

export function supprimerNatureSection({commit}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_NATURE_SECTION', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/supprimer_nature_section/' + id).then(() => dialog.close() )   
    })
}






 
// get all type unite administrative
export function getTypeUniteAdministrative({ commit }) {
    queue.push(() => axios.get('/type_uas').then((response) => {
        commit('GET_TYPE_UNITE_ADMINISTRATIVE', response.data)

    }).catch(error => console.log(error)))
}


// ajouter type ua
export function ajouterTypeUniteAdministrative({ commit }, objetAjoute) {
    asyncLoading(axios.post('/ajouter_type_ua', {

        libelle: objetAjoute.libelle
    })).then(response => {
            if (response.status == 201) {
                commit("AJOUTER_TYPE_UNITE_ADMINISTRATIVE", response.data);
               
                this.$app.$notify({
                    title: 'Success',
                    text: 'Enregistrement Effectué avec Succès!',
                    type: "success"
                })
            }
        });
}

// supprimer type ua
export function supprimerTypeUniteAdministrative({ commit, dispatch}, id) {
      this.$app.$dialog
        .confirm("Voulez vouz vraiment supprimer ?.")
        .then(dialog => {
            commit("SUPPRIMER_TYPE_UNITE_ADMINISTRATIVE", id);
            dispatch('getTypeUniteAdministrative')

            // // dialog.loading(false) // stops the proceed button's loader
            axios.delete("/supprimer_type_ua/" + id).then(() => dialog.close());
        });
}

// modifier type ua 
export function modifierTypeUniteAdministrative({ commit, dispatch}, typeua) {
    asyncLoading(axios.put('/modifier_type_ua/' + typeua.id, {

        libelle: typeua.libelle
    })).then(response => {
            commit("MODIFIER_TYPE_UNITE_ADMINISTRATIVE", response.data);
        dispatch('getTypeUniteAdministrative')
            this.$app.$notify({
                title: 'Success',
                text: 'Modification Effectué avec Succès!',
                type: "success"
            })
        });
}



// get all  section
export  function getSection({commit}) {
    queue.push(() => axios.get('/liste_section').then(response =>{
        commit('GET_SECTION', response.data)
    }).catch(error => console.log(error)))
   
}



// ajouter  section
export function ajouterSection({commit},objetAjout){
   asyncLoading( axios.post('/ajouter_section',{
    code:objetAjout.code,
    nom_section:objetAjout.nom_section,
    naturesection_id: objetAjout.naturesection_id
})).then(response => {
        if(response.status == 201){
            commit('AJOUTER_SECTION', response.data)

            this.$app.$notify({
                title: 'success ',
                text: 'Enregistrement effectué avec success !',
                type:"success"
              })
        }
    }).catch(error => console.log(error))

}
// modififer de section
export function modifierSection({commit}, objetModifie){
  asyncLoading(  axios.put('/modifier_section/'+ objetModifie.id,{

    code:objetModifie.code,
    nom_section:objetModifie.nom_section,
    naturesection_id:objetModifie.naturesection_id
})).then(res => {
        commit('MODIFIER_SECTION', res.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
   
}


// supprimer de setion

export function supprimerSection({commit}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_SECTION', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/supprimer_section/' + id).then(() => dialog.close() )   
    })
    
}







// Action de structure programme
 // get all struture programme
 export  function getStructureProgramme({commit}){
    queue.push(() => axios.get('/liste_Structure_Programme').then(tony => {
         commit('GET_STRUCTURE_PROGRAMME', tony.data)
     }).catch(error => console.log(error)))
 }
 // ajouter structure programme
 export function ajouterStructureProgramme({commit}, elementAjout){
     asyncLoading(axios.post('/ajouter_Structure_Programme',{
        niveau:elementAjout.niveau,
        libelle:elementAjout.libelle
    })).then(response => {
         if(response.status == 201){
             commit('AJOUTER_STRUCTURE_PROGRAMME', response.data)

             this.$app.$notify({
                title: 'success ',
                text: 'Enregistrement effectué avec success !',
                type:"success"
              })
         }
     }).catch(error => console.log(error))
 }

// modifier la structure programme
export function modifierStructureProgramme({commit}, objetModifie){
  asyncLoading(  axios.put('/modifier_Structure_Programme/'+ objetModifie.id,{

    niveau:objetModifie.niveau,
    libelle:objetModifie.libelle
})).then(res => {
        commit('MODIFIER_STRUCTURE_PROGRAMME', res.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
   
}


 // souprime structure programme
 export function supprimerStructureProgramme({commit},id) {
 

  this.$app.$dialog
  .confirm("Voulez vouz vraiment supprimer ?.")
  .then(dialog => {
     commit('SUPPRIMER_STRUCTURE_PROGRAMME', id)
    // // dialog.loading(false) // stops the proceed button's loader
      axios.delete('/supprimer_Structure_Programme/' + id).then(() => dialog.close() )   
  })
 }




 // get all plan programme
 export  function getPlanProgramme({commit}){
    queue.push(() => axios.get('/liste_Plan_Programme').then(response =>{
        commit('GET_PLAN_PROGRAMME', response.data)
    }).catch(error => console.log(error)))


}
// ajouter plan programme
export  function ajouterPlanProgramme({commit, dispatch}, nouveauObjet){
asyncLoading( axios.post('/ajouterPlan_Programme',nouveauObjet)).then(response =>{
     commit('AJOUTER_PLAN_PROGRAMME', response.data)
     dispatch('getPlanProgramme')

     this.$app.$notify({
        title: 'success ',
        text: 'Enregistrement effectué avec success !',
        type:"success"
      })
 }).catch(error => console.log(error))
}

// modifier plan programme
export function modifierPlanProgramme({commit, dispatch}, nouveauObjet){
asyncLoading( axios.put('/modifier_Plan_Programme/'+ nouveauObjet.id,{
    code:nouveauObjet.code,
    libelle:nouveauObjet.libelle,
    structure_programme_id:nouveauObjet.structure_programme_id
})).then( resultat =>{
     commit('MODIFIER_PLAN_PROGRAMME',resultat.data)
     dispatch('getPlanProgramme')
     this.$app.$notify({
        title: 'success ',
        text: 'Modification effectué avec success !',
        type:"success"
      })
 })
}
// supprimer le plan programme
export function supprimerPlanProgramme({commit, dispatch}, id){

 this.$app.$dialog
 .confirm("Voulez vouz vraiment supprimer ?.")
 .then(dialog => {
    commit('SUPPRIMER_PLAN_PROGRAMME', id)
    dispatch('getPlanProgramme')
   // // dialog.loading(false) // stops the proceed button's loader
     axios.delete('/supprimer_Plan_Programme/' + id).then(() => dialog.close() )   
 })
}








 // Action structure administrative
 // get all structure administartive
 export  function getStructureAdministrative({commit}){
 queue.push(() => axios.get('/liste_structure_administrative').then(response =>{
     commit('GET_STRUCTURE_ADMINISTATIVE',response.data)
 }).catch(error => console.log(error)))

 }
 // ajouter structure administrative
 export function ajouterStructureAdministrative({commit}, objetAjoute){
  asyncLoading(   axios.post('/ajouter_structure_administrative',{
    niveau:objetAjoute.niveau,
    libelle:objetAjoute.libelle,

 })).then(response =>{
         if(response.status == 201){
commit('AJOUTER_STRUCTURE_ADMINISTRATIVE', response.data)

this.$app.$notify({
    title: 'success ',
    text: 'Enregistrement effectué avec success !',
    type:"success"
  })
         } 
     }).catch(error => console.log(error))
 }
 // modifier structure administrative
 export function modifierStructureAdministrative({commit}, nouveauObjet){
asyncLoading( axios.put('/modifier_structure_administrative/'+ nouveauObjet.id,{
    niveau:nouveauObjet.niveau,
    libelle:nouveauObjet.libelle
})).then( resultat =>{
     commit('MODIFIER_STRUCTURE_ADMINISTRATIVE',resultat.data)

     this.$app.$notify({
        title: 'success ',
        text: 'Modification effectué avec success !',
        type:"success"
      })
 })
}

// supprimer structure administrative
export function supprimerStructureAdministrative({commit}, id){

   this.$app.$dialog
   .confirm("Voulez vouz vraiment supprimer ?.")
   .then(dialog => {
      commit('SUPPRIMER_STRUCTURE_ADMINISTRATIVE', id)
     // // dialog.loading(false) // stops the proceed button's loader
       axios.delete('/supprimer_structure_administrative/' + id).then(() => dialog.close() )   
   })
}
 
  

   // get all service gestionnaire
   export  function getServiceGestionnaire({commit}){
    queue.push(() => axios.get('/liste_service_gestionnaire').then(response =>{
        commit('GET_SERVICE_GESTIONNAIRE', response.data)
    }).catch(error => console.log(error)))


}
// ajouter  service gestionnaire
export  function ajouterServiceGestionnaire({commit, dispatch}, nouveauObjet){
asyncLoading( axios.post('/ajouter_service_gestionnaire',nouveauObjet)).then(response =>{
     commit('AJOUTER_SERVICE_GESTIONNAIRE', response.data)
     dispatch('getServiceGestionnaire')
     this.$app.$notify({
        title: 'success ',
        text: 'Enregistrement effectué avec success !',
        type:"success"
      })
 }).catch(error => console.log(error))
}
// modifier service gestionnaire
export function modifierServiceGestionnaire({commit, dispatch}, nouveauObjet){
 asyncLoading(axios.put('/modifier_service_gestionnaire/'+ nouveauObjet.id,{
    code:nouveauObjet.code,
    libelle:nouveauObjet.libelle,
    ordre:nouveauObjet.ordre,
    structure_administrative_id:nouveauObjet.structure_administrative_id
})).then( resultat =>{
     commit('MODIFIER_SERVICE_GESTIONNAIRE',resultat.data)
     dispatch('getServiceGestionnaire')

     this.$app.$notify({
        title: 'success ',
        text: 'Modification effectué avec success !',
        type:"success"
      })
 })
}
// supprimer service gestionnaire
export function supprimerServiceGestionnaire({commit, dispatch}, id){
   
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_SERVICE_GESTIONNAIRE', id)
       dispatch('getServiceGestionnaire')
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/supprimer_service_gestionnaire/' + id).then(() => dialog.close() )   
    })
 }



// Action de structure de geographique


// get all struture geographique
export  function getStructureGeographique({commit}) {
    queue.push(() => axios.get('/liste_structure_localgeo').then( resultat => {
        commit('GET_STRUCTURE_GEOGRAPHIQUE', resultat.data)
    }).catch(error => console.log(error)))
}

//  ajouter struture geographique
export function ajouterStructureGeographique({commit}, nouveauObjet){
   asyncLoading( axios.post('/ajouter_structure_localgeo',{
    niveau:nouveauObjet.niveau,
    libelle:nouveauObjet.libelle
})).then( response => {
        commit('AJOUTER_STRUCTURE_GEOGRAPHIQUE', response.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Enregistrement effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
}
// modifier struture geographique
export function modifierStructureGeographique({commit}, objetModifie){
   asyncLoading( axios.put('/modifier_structure_localgeo/'+ objetModifie.id, {
    niveau:objetModifie.niveau,
    libelle:objetModifie.libelle
})).then( response => {
        commit('MODIFIER_STRUCTURE_GEOGRAPHIQUE', response.data)
        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
}
// supprimer struture geographique
export function supprimerStructureGeographique({commit}, id){
   
        this.$app.$dialog
        .confirm("Voulez vouz vraiment supprimer ?.")
        .then(dialog => {
           commit('SUPPRIMER_STRUCTURE_GEOGRAPHIQUE', id)
          // // dialog.loading(false) // stops the proceed button's loader
            axios.delete('/supprimer_structure_localgeo/' + id).then(() => dialog.close() )   
        })
}


// Action localisation geographique


// get all localisation geographique
export  function getLocalisationGeographique({commit}) {
    queue.push(() => axios.get('/liste_localisation_geo').then( resultat => {
        commit('GET_LOCALISATION_GEOGRAPHIQUE', resultat.data)
    }).catch(error => console.log(error)))
}

//  ajouter localisation geographique
export function ajouterLocalisationGeographique({commit, dispatch}, objetElement){
   asyncLoading( axios.post('/ajouter_localisation_geo',objetElement)).then( response => {
        commit('AJOUTER_LOCALISATION_GEOGRAPHIQUE', response.data)
        dispatch('getLocalisationGeographique')

        this.$app.$notify({
            title: 'success ',
            text: 'Enregistrement effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
}
// modifier localisation geographique
export function modifierLocalisationGeographique({commit, dispatch}, objetModifie){
   asyncLoading( axios.put('/modifier_localisation_geo/'+ objetModifie.id, {
    code:objetModifie.code,
    libelle:objetModifie.libelle,
   structure_localisation_geographique_id:objetModifie.structure_localisation_geographique_id
})).then( response => {
        commit('MODIFIER_LOCALISATION_GEOGRAPHIQUE', response.data)
        dispatch('getLocalisationGeographique')

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
}
// supprimer localisation geographique
export function supprimerLocalisationGeographique({commit, dispatch}, id){
    
        this.$app.$dialog
        .confirm("Voulez vouz vraiment supprimer ?.")
        .then(dialog => {
           commit('SUPPRIMER_LOCALISATION_GEOGRAPHIQUE', id)
           dispatch('getLocalisationGeographique')
          // // dialog.loading(false) // stops the proceed button's loader
            axios.delete('/supprimer_localisation_geo/' + id).then(() => dialog.close() )   
        })
}



//// chapitre //


   // get all chapitre
   export  function getChapitre({commit}){
    queue.push(() => axios.get('/liste_chapitre').then(response =>{
        commit('GET_CHAPITRE', response.data)
    }).catch(error => console.log(error)))


}
// ajouter  chapitre
export  function ajouterChapitre({commit}, formData){
asyncLoading( axios.post('/ajouter_chapitre',formData)).then(response =>{
     commit('AJOUTER_CHAPITRE', response.data)

     this.$app.$notify({
        title: 'success ',
        text: 'Enregistrement effectué avec success !',
        type:"success"
      })


 }).catch(error => console.log(error))

// console.log(formData)
}

// modifier chapitre
export function modifierChapitre({commit}, elementModifie){
 asyncLoading(axios.put('/modifier_chapitre/'+ elementModifie.id, {
    code:elementModifie.code,
     libelle:elementModifie.libelle,
 localisation_geographique_id:elementModifie.localisation_geographique_id,
 servicegestionnaires_id:elementModifie.servicegestionnaires_id
 
 })).then( resultat =>{
     commit('MODIFIER_CHAPITRE',resultat.data)

     this.$app.$notify({
        title: 'success ',
        text: 'Modification effectué avec success !',
        type:"success"
      })
 })
}
// supprimer chapitre
export function supprimerChapitre({commit}, id){
  
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_CHAPITRE', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/supprimer_chapitre/' + id).then(() => dialog.close() )   
    })
}




// Action grande nature///

// get all grande nature
export async function getGrandeNature({commit}) {
    await axios.get('/liste_grande_nature').then( resultat => {
        commit('GET_GRANDE_NATURE', resultat.data)
    }).catch(error => console.log(error))
}

//  ajouter grande nature
export function ajouterGrandeNature({commit}, nouveauObjet){
   asyncLoading( axios.post('/add_grande_nature',{
    code:nouveauObjet.code,
    libelle:nouveauObjet.libelle
})).then( response => {
        commit('AJOUTER_GRANDE_NATURE', response.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Enregistrement effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
}
// modifier grande nature
export function modifierGrandeNature({commit}, objetModifie){
    asyncLoading(axios.put('/update_grande_nature/'+ objetModifie.id, {
        code:objetModifie.code,
        libelle:objetModifie.libelle
   })).then( response => {
        commit('MODIFIER_GRANDE_NATURE', response.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))
}
// supprimer grande nature
export function supprimerGrandeNature({commit}, id){
   
        this.$app.$dialog
        .confirm("Voulez vouz vraiment supprimer ?.")
        .then(dialog => {
           commit('SUPPRIMER_GRANDE_NATURE', id)
          // // dialog.loading(false) // stops the proceed button's loader
            axios.delete('/delete_grande_nature/' + id).then(() => dialog.close() )   
        })
}

