const h2o = {
    recipes: [],
    filter: [],
    recipesTotal: [],
    dietTypes: [],
    detail: []
};

const elReducerAtomico =(manaos = h2o, action)=>{
    switch(action.type){
        case "GET_RECIPES":
            return{
                ...manaos,
                recipes: action.payload,
                recipesTotal: action.payload
            };
        case "GET_RECIPES_BY_NAME":
            return{
                ...manaos,
                recipes: action.payload
            };
        case "GET_DIET_TYPES":
            return{
                ...manaos,
                dietTypes: action.payload
            };
        case "GET_RECIPE_DETAIL":
            return{
                ...manaos,
                detail: action.payload
            };
        case "FILTER_BY_ORDER":
            let filter0;
            if(action.payload === "asc")
                filter0 = manaos.recipes.sort((a,b)=>{
                    if(a.puntuation > b.puntuation)return 1;
                    else if (a.puntuation < b.puntuation)return -1;
                    else return 0;
                })
            else if(action.payload === "desc")
                filter0 = manaos.recipes.sort((a,b)=>{
                    if(a.puntuation > b.puntuation)return -1;
                    else if (a.puntuation < b.puntuation)return 1;
                    else return 0;
                })
            else filter0 = manaos.recipes;
            return{
              ...manaos,
              recipes: filter0  
            };

        case "FILTER_BY_ORDER_ALPHABETICAL":
            let filterAlp;
            if(action.payload === "asc")
                filterAlp = manaos.recipes.sort((a,b)=>{
                    if(a.name.toLowerCase()>b.name.toLowerCase())return 1;
                    else if(a.name.toLowerCase()<b.name.toLowerCase())return -1;
                    else return 0;
                })
            else if(action.payload === "desc")
            filterAlp = manaos.recipes.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase())return -1;
                else if(a.name.toLowerCase()<b.name.toLowerCase())return 1;
                else return 0;
            })
            else filterAlp = manaos.recipes;
            return {
                ...manaos,
                recipes: filterAlp
            };

        case "FILTER_BY_DIET_TYPES":
                const recipes = manaos.recipes;
                const dietsApi = [];
                const dietsDB = [];

                recipes.forEach(diet =>{
                    if(diet.hasOwnProperty("dietTypes")&&diet.dietTypes.find(d=>d.name===action.payload)) dietsDB.push(diet)
                });
                const response=dietsApi.concat(dietsDB);
                if(response.length){
                    return{
                        ...manaos,
                        recipes: response
                    }
                }
                else alert('No hay recetas de este tipo.'); break;


        case "FILTER_BY_CREATION":
            let filterC;
            if(action.payload==="existent")
                filterC=manaos.recipes.filter(p=>!p.createInDB);
            else if(action.payload==="created")
                filterC=manaos.recipes.filter(p=>p.createInDB);
            else filterC=manaos.recipes;
            return{
                ...manaos,
                recipes: filterC
            };


        case "POST_RECIPE":
            return {
                ...manaos
            };

        default: return manaos;
    };
};
export default elReducerAtomico;