import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { NavLink } from "react-router-dom";
import Cards from '../Cards/Cards';
import SearchBar from "../searchbar/SearchBar";
import { 
    getAllRecipes,
    filterByOrder,
    filterByOrderAlphabetical,
    filterByDietTypes,
    filterByCreation } from "../../axios/index";
import style from "./home.module.css"

const Homeson =()=>{
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [recipesPerPage] = React.useState(9);
    const lastIndexRecipe = currentPage * recipesPerPage;
    const firstIndexRecipe = lastIndexRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(firstIndexRecipe, lastIndexRecipe);

    const paged = pageNumber =>{
        setCurrentPage(pageNumber)
    };

    //////////////////////////////////
    //eslint-disable-next-line
    const [setOrder]=React.useState('');


    React.useEffect(()=>{dispatch(getAllRecipes())}, [dispatch]);
    
    const bringRecipes = evt => {
        evt.preventDefault();
        dispatch(getAllRecipes(evt.target.value));
    };

    const filterOrder=evt=>{
        evt.preventDefault();
        dispatch(filterByOrder(evt.target.value));
        setCurrentPage(1);
        setOrder(`ordered ${evt.target.value}`); //setea el estado local order declarado arriba
    };

    const filterOrderAlphabetical=evt=>{
        evt.preventDefault();
        dispatch(filterByOrderAlphabetical(evt.target.value));
        setCurrentPage(1);
        setOrder(`ordered ${evt.target.value}`); //setea el estado local order declarado arriba
    };

    const filterDiets = evt =>{
        evt.preventDefault();
        dispatch(filterByDietTypes(evt.target.value));
        setCurrentPage(1)
    };
    const filterCreation = evt =>{
        evt.preventDefault();
        dispatch(filterByCreation(evt.target.value));
        setCurrentPage(1);
    };

    return(
        <div className={style.container}>
            <button onClick={evt=>bringRecipes(evt)}className={style.btnrecipes}>Recetas</button>
            <NavLink to="/recipe"><button className={style.btncreate}>Create</button></NavLink>

            <SearchBar/>
            
            <div>
                <label className={style.homelabel}>Order:</label>
                <select onChange={ evt => filterOrder(evt)} className={style.homeselect}>
                    <option value="-">'BY SCORE'</option>
                    <option value="asc">ascendente</option>
                    <option value="desc">descendente</option>
                </select>

                <label className={style.homelabel}>Order:</label>
                <select onChange={evt=>filterOrderAlphabetical(evt)} className={style.homeselect}>
                    <option value="-">'ALPHABETICAL</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <label className={style.homelabel}>Filter:</label>
                <select onChange={evt=>filterDiets(evt)} className={style.homeselect}>
                    <option value="-">'AS DIET TYPE'</option>
                    <option value="gluten free">gluten free</option>
                    <option value="dairy free">dairy free</option>
                    <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                    <option value="vegan">vegan</option>
                    <option value="paleolithic">paleolithic</option>
                    <option value="primal">primal</option>
                    <option value="pescatarian">pescatarian</option>
                    <option value="fodmap friendly">fodmap friendly</option>
                    <option value="whole 30">whole 30</option>
                </select>

            
            <label className={style.homelabel}>Filter:</label>
            <select onChange={evt=>filterCreation(evt)}className={style.homeselect}>
                <option value="-">'CREAR'</option>
                <option value="created">CREADO CON ÉXITO</option>
                <option value="existent">YA EXISTE</option>
            </select>
            </div>

            <paged recipesPerPage={recipesPerPage}recipesLength={recipes.length}paged={paged}/>



            <div className={style.home_cardflexcontainer}>
                {currentRecipes.length >= 1 ? currentRecipes.map(recipe =>(
                    <Cards
                    key={recipe.id}
                    name = {recipe.name}
                    image = {recipe.image}
                    dieta = {recipe.diets ? recipe.diets : recipe.dietTypes && recipe.dietTypes.map((i) => i.name)}
                    id = {recipe.id}
                    />
                ))               
                :
                <h5>asdaaaaaaaaaaaaaaaaaaaaa</h5>
                }</div>
        </div>
    );};
export default Homeson;