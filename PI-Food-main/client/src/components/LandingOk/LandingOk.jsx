import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../axios";
import style from './LandingOk.module.css';

const LandingOk =()=> {

    const dispatch=useDispatch();
    React.useEffect(()=>{dispatch(getAllRecipes())},[dispatch]);
    return(
        <div className={style.LP_container}>
            <h3>Alooooooooooa</h3>         
            <NavLink to="/homeson" className="link">
                <button className={style.LP_btn}><span className={style.LP_app}>Provechio</span></button>
                </NavLink>
            
        </div>
    );
};
export default LandingOk;