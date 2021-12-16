const { Router } = require('express');
const recipes = require('./recipes');

const router = Router();

router.use("/recipes", recipes);
router.get("/recipes/:id", mostrarRecetaXID);
router.get("/types", mostrarTiposDeDietas);
router.post("/recipe", postearReceta);


module.exports = router;
