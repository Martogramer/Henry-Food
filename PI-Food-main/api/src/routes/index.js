const { Router } = require('express');
const recipes = require('./recipes');
const recipe = require('./recipe');
const diets = require('./diets');

const router = Router();

router.use("/recipes", recipes);
router.use("/recipe", recipe);
router.use("/diets", diets);

//router.post("/recipe", postearReceta);


module.exports = router;
