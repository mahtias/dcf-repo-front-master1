import axios from '../../../../../urls/api_parametrage/api'
import { asyncLoading } from 'vuejs-loading-plugin'


var housecall= require('housecall')
var queue = housecall({concurrency: 2, cooldown: 1000})


// get all structure activite
export  function  getStructureActivite({commit}) {
  queue.push(() =>  axios.get('/liste_structure_activite').then((response) => {
    commit('GET_ACTIVITE', response.data)
    
}).catch(error => console.log(error)))
}


// ajouter structure activite
export  function ajouterStructureActivite({commit}, objetAjoute){
   asyncLoading( axios.post('/add_structure_activite', {
    niveau:objetAjoute.niveau,
    libelle: objetAjoute.libelle
} )).then(res => {
        if(res.status == 201){
            commit('AJOUTER_STRUCTURE_ACTIVITE', res.data)
            this.$app.$notify({
                title: 'success ',
                text: 'Enregistrement effectué avec success !',
                type:"success"
              })
        
              
        }
    }).catch(error => console.log(error))
}

// modifier structure activite
export function modifierStructureActivite({commit}, activite){
   asyncLoading( axios.put('/update_structure_activite/' + activite.id, {
    niveau:activite.niveau,
    libelle: activite.libelle
})).then(response => {
        commit('MODIFIER_STRUCTURE_ACTIVITE', response.data)

        this.$app.$notify({
            title: 'success ',
            text: 'Modification effectué avec success !',
            type:"success"
          })
    }).catch(error => console.log(error))

}


// supprimer structureactivite
export function supprimerStructureActivite({commit}, id){
 
    this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
       commit('SUPPRIMER_STRUCTURE_ACTIVITE', id)
      // // dialog.loading(false) // stops the proceed button's loader
        axios.delete('/delete_structure_activite/' + id).then(() => dialog.close() )   
    })
}


