import axios from './api_suivi_engagement_mandat/api'
import { asyncLoading } from 'vuejs-loading-plugin'


var housecall= require('housecall')
var queue = housecall({concurrency: 2, cooldown: 1000})

export function getEngagement({commit,}){
    queue.push(() => axios.get('/liste_engagement')).then((varEngagement) => {
        commit('GET_ENGAGEMENT_MANDAT', varEngagement.data)
    }).catch(error => console.log(error))
}


export function ajouterEngagement({commit}, formData){
    asyncLoading(axios.post('/add_engagement', formData)).then(response =>{

            commit('AJOUTER_ENGAGEMENT_MANDAT', response.data)

            this.$app.$notify({
              title: 'success ',
              text: 'Enregistrement effectué !',
              type:"success"
            })
        

    }).catch(error => console.log(error))
}

