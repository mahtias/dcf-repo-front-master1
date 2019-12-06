const structures_activites = state=> state.structures_activites.sort((a,b)=>(a.niveau>b.niveau)? 1:-1)


export{
structures_activites,


}