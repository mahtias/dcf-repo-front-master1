
const structures_fonctionnelles = state => state.structures_fonctionnelles.sort((a,b)=>(a.niveau>b.niveau)? 1:-1) 
const plans_fonctionnels = state =>state.plans_fonctionnels.sort((a,b)=>(a.code>b.code)? 1:-1)


export {

    structures_fonctionnelles,
    plans_fonctionnels
}


