const express = require('express');
const axios = require('axios');
const {Recipe, Type} = require('../db');
const {Sequelize} = require ('sequelize');
//const Op = Sequelize.Op;
const {API_KEY} = process.env;

const router = express.Router()
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getApiInfo = async () => {    
        try {
            const apiUrl = await axios('https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100');
            const apiInfo = apiUrl.data.results.map(la => {
                return {
                    id: la.id,
                    name: la.title,
                    imagen: la.image,
                    resumen: la.summary,
                    puntuacion: la.spoonacularScore,
                    saludableLvl: la.healthScore,
                    stepByStep: la.analyzedInstructions
                    .map(a => a.steps.map(b => b.step))
                    .flat(1)
                    .join(""),
                    diets: la.diets.map(diet => diet) 
                };
        });   return apiInfo;
    } catch(err){return[];}
};

const getDbInfo = async () => {
    try{
        return await Recipe.findAll({
            include:{
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
    }catch(err){return[]};
};

const getAllRecipes = async () => {
    const apiData = await getApiInfo();
    const dbData = await getDbInfo();    
    const todaLaData = apiData.concat(dbData);
    return todaLaData;    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////7//////7//////7

router.get('/', async (req, res)=>{
    const name = req.query.name
    if(name){
        const resp = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const {results} = resp.data
        const infoQuery = results.map(el=>({
            id: el.id,
            title: el.title,
            img: el.image,
            typeDiets: el.diets.map((d)=>{return{name:d}}),
            spoonacularScore: el.spoonacularScore,
            dishTypes: el.dishTypes.map((d)=>{return{name:d}}),
            summary: e.summary,
            healthScore: el.healthScore,
            analyzedInstructions: el.analyzedInstructions
        }))
        const cd = await getDbInfo()
        const filter = cd.filter(n=>n===name.toLowerCase())
        let recipesName = await infoQuery.concat(filter);

        recipesName.length?res.status(200).send(error.message):res.status(404).send(error.message);
    }else{
        let allRecipes=await getAllRecipes();
        res.status(200).json(allRecipes)
    }
})

router.get('/data', async(req, res)=>{
    const allDb = await getDbInfo()
    if(allDb !== 'error'){
        res.json(allDb)
    }else{
        res.status(404).json({message: 'error en base de datos'})
    }
})

router.get('/:id', async(req,res)=>{
    const id= req.params.id;
    const allRecipes = await getAllRecipes();
    if(id){
        let recipeId = await allRecipes.filter(e=>e.id == id)
        recipeId.length?res.status(200).json(recipeId):res.status(404).send('no se encontro la receta')
    }
})




module.exports = router;








/* 
const mostrarTodasLasRecetas = async (req, res) =>{
    const name = req.query.name;        //// buscar name por query
    const recipesTotal = await getAllRecipes();
    if(name){
        let recipeTitle = await recipesTotal.filter(a => a.name.toLowerCase().includes(name.toLowerCase()))   /// filtro todos los titles de recetas / loque le  paso por query / el tolowercase pasa a minuscula lo que llega por query
        recipeTitle.lenght ?    // ? si encontro algo manda recipeTitle : si no manda un 404
        res.status(200).send(recipeTitle) :           ////////// aca podria poner ambas opciones dentro de un if con sentencia (recipeTitle.length >0)
        res.status(404).send('No se encuentra la receta');   // sino probar con .json({message: ""}) en vez de .send('')
    } else {
        res.status(200).send(recipesTotal)    ///si no hay un query .send recipesTotal
    }
};

const mostrarTiposDeDietas = async(req,res)=>{
    const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=25fd7f06df3649c3a6a630c301e1d041&addRecipeInformation=true&number=100`)
    const diet = dietsApi.data.results.map(i => i.diets);
    const dietTwo = [];
    /////--- mapeo los arreglos que devuelve, los recorro y los itero en un solo arreglo "dietas"
    diet.map(e => {
        for(let i=0; i<e.lenght; i++){
            dietTwo.push(e[i]);
        };});   // sino en vez de retornar puedo hacer dietch.push(e[i])
    dietTwo.forEach(element => {
        if(element){
            Type.findOrCreate({
                where: { name: element }
        })};
    });
    const allDiets = await  Type.findAll();
    res.send(allDiets);
};

const mostrarRecetaXID = async (req,res) => {
    const id= req.params.id.trim();
    const allRecipes =  await getAllRecipes();
    if(id){
        let recipeId = await allRecipes.filter(r => r.id.toString() === id.toString());
        recipeId.lenght ?
        res.status(200).send(recipeId) :
        res.status(404).send('No hay Id')
    }
}

const postearReceta = async (req,res) => {
    try {
        let diets = req.body.diets;
        const nuevaReceta = await Recipe.create({
            name: req.body.name,
            resumen: req.body.resumePlate,
            puntos: req.body.puntuation,
            healthy: req.body.healthyLevel,
            stepByStep: req.body.stepByStep,
            image: req.body.image,
            createInDb: req.body.createdInDB
        });
        let dietTypeDB = await DietTypes.findAll({
            where: {
                name: {
                    [Op.in] : diets
                }
            }
        });
        dietTypeDB.map(i => nuevaReceta.addDietTypes(i));
        res.status(200).send('Se creó!');
    }
    catch(err) {
        console.log(err);
        res.status(404).send('Te faltan cosas pichon')
    };
};

 */


