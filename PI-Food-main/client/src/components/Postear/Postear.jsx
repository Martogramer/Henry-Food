import React from "react";
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getDietTypes, postRecipe } from "../../axios";
import {useDispatch, useSelector} from "react-redux";
import style from "./poster.module.css";


const RecipeCreator=()=>{
    const dispatch = useDispatch();
    const dietTypes = useSelector(state => state.dietTypes);
    const history = useNavigate();


    React.useEffect(()=>{dispatch(getDietTypes())}, [dispatch]);
    const [errors, setErrors]=React.useState({});
    const [habilitado, setHabilitado]=React.useState(false);

    const inputValidate=input=>{
        const errors={};
        if(!input.name){
            errors.name="Falta el nombre de la receta!";
            setHabilitado(false)
        }
        if(!input.resumePlate){
            errors.resumePlate="Agregá un resumen a tu plato";
            setHabilitado(false)
        }
        else setHabilitado(true);
        return errors;
    };

    const[input, setInput]=React.useState({
        name: "",
        resumePlate: "",
        puntuation: 0,
        healthyLevel: 0,
        stepByStep: "",
        diets: [],
        image: ""
    });
const typing = evt =>{
    evt.preventDefault();
    setInput({
        ...input,
        [evt.target.name] : evt.target.value
    });
    setErrors(inputValidate({
        ...input,
        [evt.target.name] : evt.target.value
    }))
};
const submiting=evt=>{
    evt.preventDefault();
    dispatch(postRecipe(input));
    alert("La receta fue creada!");
    setInput({
        name: "",
        resumePlate: "",
        puntuation: 0,
        healthyLevel: 0,
        stepByStep: "",
        diets: [],
        image: ""
    });
    history.push("/homeson")
};

const selection=evt=>{
    setInput({
        ...input,
        diets: [...input.diets, evt.target.value]
    });
};
return(
    <div>
        <NavLink to="/homeson" className={style.crator_link} activeClassName={style.creator_link_a}>Atras</NavLink>
        
        <form className={style.creator_container}>
            <div>
                <input placeholder="Nombre de receta.."
                value={input.name}
                name="name"
                onChange={evt=>{typing(evt)}}
                autoComplete="off"
                className={style.creator_input}
                 />
                 {errors.name&&(<div className={style.creator_err}>{errors.name}</div>)}
            </div>
            <div>
                <textarea name="resumePlate"
                placeholder="Resumen de la receta.."
                value={input.resumePlate}
                onChange={evt=>{typing(evt)}}
                className={style.creator_textarea}/>
                 {errors.resumePlate&&(<div className={style.creator_err}>{errors.resumePlate}</div>)}
            </div>
            
            <div>
            <input placeholder="imagen URL de tu receta"
                type="text"                
                value={input.image}
                name="imagen"
                onChange={evt=>{typing(evt)}}
                autoComplete="off"
                className={style.creator_input_i} />
            </div>

            <div>
                <textarea name="stepByStep"
                placeholder="tu receta paso a paso"
                value={input.stepByStep}
                onChange={evt=>{typing(evt)}}
                className={style.creator_textarea}/>
            </div>
            
 
            <div>
                <label>Tipo de dieta: </label>
                <select name="dietType" 
                        onChange={evt=>{selection(evt)}}
                        className={style.creator_select}>   {dietTypes&&dietTypes.map(diet=>(<option value={diet.name}>{diet.name}</option>))}
                </select>
            </div>
            
{/*             <ul className={style.creator_ul}><li>{input.diets && input.diets.map(diet=>`// ${diet} //`)}</li></ul>
 */}            
            <div>
                {<button type="submit" disabled={!habilitado} onClick={evt=>submiting(evt)} className={style.creator_btn}>CREAR</button>}
 
            </div>
        </form>
    </div>
);
};
export default RecipeCreator;