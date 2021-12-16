const express = require('express');
const router = express.Router();
require('dotenv').config();
const {Recipe, Type}=require('../db');

router.post('/', async(req, res)=>{
    let{
        name,
        summary,
        score,
        healthScore,
        image,
        steps,
        diets,
        createINBd
    }= req.body
    try{
        let recipeCreate = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            image,
            steps,
            diets,
            createINBd
        })
        let dietDB = await Type.findAll({
            where: {name: diets}
        })
        recipeCreate.addDiet(dietDB)
        res.send(recipeCreate)
    }catch(error){
        res.status(400).json({error})
    }
})
module.exports = router;