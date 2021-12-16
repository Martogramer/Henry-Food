import React from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../axios";
import style from "./searchbar.module.css";

const SearchBar =()=>{
    const dispatch=useDispatch();
    const[search,setSearch] = React.useState('');
    const typing=evt=>{
        evt.preventDefault();
        setSearch(evt.target.value);
    };
    const submiting = evt=>{
        evt.preventDefault();
        dispatch(getRecipesByName(search))
        setSearch("");
        console.log(search)
    };
    const enter=evt=>{
        if(evt.key==='Enter'){
            evt.preventDefault();
            dispatch(getRecipesByName(search));
            setSearch("");
        };
    };
    return(
        <div className={style.sb_cont}>
            <button type="submit" onClick={evt=>submiting(evt)} className={style.btn}>🔎</button>
            <input type="text" placeholder="Busca una receta." onKeyDown={enter} onChange={evt=>typing(evt)} className={style.input} />
        </div>
    );
};
export default SearchBar;