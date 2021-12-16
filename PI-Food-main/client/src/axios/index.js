import axios from 'axios';

export const getAllRecipes=()=>{
    return async function(dispatch){
        const one = await axios('http://localhost:3001/recipes');
        return dispatch({
            type: "GET-RECIPES",
            payload: one.data
        });
    };
};

export const getDietTypes=()=>{
    return async function(dispatch){
        const two = await axios('http://localhost:3001/types');
        return dispatch({
            type: "GET_DIET_TYPES",
            payload: two.data
        });
    };
};

export const getRecipesByName=payload=>{
    return async function(dispatch){
        try{
            const byName = await axios(`http://localhost:3001/recipes?name=${payload}`);
            return dispatch({
                type: "GET_RECIPE_BY_NAME",
                payload: byName.data
            });
        } catch(err){
            console.log(err)
        };
    };
};

export const getRecipeDetail=payload=>{
    return async function(dispatch){
        try{
            const oneOne=await axios(`http://localhost:3001/recipes/${payload}`);
            return dispatch({
                type: "GET_RECIPE_DETAIL",
                payload: oneOne.data
            });
        }catch(err){
            console.log(err);
        };
    };
};

export const filterByOrder = payload=>{
    return{
        type: "FILTER_BY_ORDER",
        payload
    };
};

export const filterByOrderAlphabetical=payload=>{
    return{
        type: "FILTER_BY_ORDER_ALPHABETICAL",
        payload
    };
};

export const filterByDietTypes=payload=>{
    return{
        type: "FILTER_BY_DIET_TYPES",
        payload
    }
};

export const filterByCreation=payload=>{
    return{
        type: "FILTER_BY_CREATION",
        payload
    };
};

export const postRecipe=payload=>{
    return async function(){
        const res=await axios.post("http://localhost:3001/recipe", payload);
        return res;
    };
};