
export const GET_ENGAGEMENT_MANDAT = (state, tableau_engagement) => {

    state.engagements = tableau_engagement
}

// ajouter engagement mandat
export const AJOUTER_ENGAGEMENT_MANDAT = (state ,elementAjout) => {
    state.engagements.unshift(elementAjout)
}

// modifier imputation

export const MODIFIER_ENGAGEMENT_MANDAT = (state, elementModifie)=> {
    state.engagements = state.engagements.map(response =>{
        if(response.id == elementModifie.id){
            response = {...elementModifie}
        }
         return response
    })
}

// supprimer imputation

export const SUPPRIMER_ENGAGEMENT_MANDAT = (state, id) => {
    state.engagements = state.engagements.filter( res => res.id !=id)
}





export const GET_PROCEDURE = (state, tableau_procedure) => {

    state.procedures = tableau_procedure
}

// ajouter engagement mandat
export const AJOUTER_PROCEDURE = (state ,elementAjout) => {
    state.procedures.unshift(elementAjout)
}

// modifier imputation

export const MODIFIER_PROCEDURE = (state, elementModifie)=> {
    state.procedures = state.procedures.map(response =>{
        if(response.id == elementModifie.id){
            response = {...elementModifie}
        }
         return response
    })
}

// supprimer imputation

export const SUPPRIMER_PROCEDURE = (state, id) => {
    state.procedures = state.procedures.filter( res => res.id !=id)
}