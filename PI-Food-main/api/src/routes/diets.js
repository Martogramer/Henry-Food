const express = require('express')
const router = express.Router();
const {Type}=require('../db');

router.get('/', async (req, res)=>{
    try{
        let typesDiet = await Type.findAll();
        res.status(200).json(typesDiet);
    }catch(error){console.log(error)}
})
module.exports = router;