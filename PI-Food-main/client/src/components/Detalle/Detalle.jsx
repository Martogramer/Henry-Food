import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getRecipeDetail } from "../../axios";
import style from "./detail.module.css";

const RecipeDetail = props => {
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.detail);

    React.useEffect(() =>{dispatch(getRecipeDetail(props.match.params.id))}, [dispatch, props.match.params.id]);

    return(
        <div className={style.detail_form}>
            <NavLink to="/home" className={style.detail_link} activeClassName={style.detail_link_a}>Atras</NavLink>
            {   recipe.length >= 1 ?
                <div className={style.detail_container}>
                <h2 className={style.detail_title}>{recipe[0].name}</h2>
                <h4 className={style.detail_score}>Score: {recipe[0].puntuation} points.</h4> <br />
                <h4 className={style.detail_health}>Healthy: {recipe[0].healthyLvl}</h4> {
                    <div>
                        <label>Tipo de Dieta</label>
                        {
                            recipe[0].diets && recipe[0].diets.length
                            ?
                            recipe[0].diets.map(diet => `${diet}`)
                            :
                            recipe[0].diets
                            ?
                            "No hay tipo de dieta para esta receta."
                            :
                            recipe[0].dietTypes && recipe[0].dietTypes.length
                            ?
                            recipe[0].dietTypes.map(diet => `${diet.name}`)
                            :
                            "No hay tipo de dieta para esta receta."
                        }
                    </div>
                }
                <hr/>
                <p className={style.detail_resume}> {recipe[0].resumePlate.replace(/<[^>]*>?/g, '')}</p>
                <img height="300px" alt="img" src={recipe[0].image} className={style.detail_img}/>
                <hr/>
                <p className={style.detail_sbs}>Step By Step: {recipe[0].stepByStep ? recipe[0].stepByStep : "no step by step"}</p>
            </div>
            : <div>
                <NavLink to="/homeson" className={style.detail_link} activeClassName={style.detail_link_a}>Atras</NavLink>                
            </div>
            }            
        </div>
    );

};

export default RecipeDetail;