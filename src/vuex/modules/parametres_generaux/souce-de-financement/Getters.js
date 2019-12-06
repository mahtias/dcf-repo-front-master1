
const sources_financements = state => state.sources_financements.sort((a,b)=>(a.code>b.code)? 1:-1) 
const types_financements = state =>state.types_financements.sort((a,b)=>(a.code>b.code)? 1:-1)


export {

    sources_financements,
    types_financements
}


