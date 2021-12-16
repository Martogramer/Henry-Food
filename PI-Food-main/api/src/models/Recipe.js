const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
    // aca exporto la funcion que define el modelo y le hago la conexion a sequelize
  const Recipe = sequelize.define('Recipe', {    
    id: {
      primaryKey: true,
      type: DataTypes.UUID, //genera un id random unico
      deafaultValue: DataTypes.UUIDV4(),
      allowNull: false,  // en false, no permite que este vacio
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    resumePlate: { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      deafaultValue: true
    },
    puntuation: {
      type: DataTypes.REAL
    },
    healthyLevel: {
      type: DataTypes.REAL
    },
    diet: {
      type: DataTypes.STRING('Sin gluten', 'Ketogénica', 'Vegetariano', 'Lacto-vegetariano', 'Ovo-Vegetariano', 'Vegano', 'Pescetariano', 'Paleo'),
      allowNull: false
    }
  }, {timestamps: false});
};