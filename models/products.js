'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products',{
    categoryId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productPrice: DataTypes.STRING,
    isActive: {
      type : DataTypes.BOOLEAN,
      defaultValue : true
    },
    description: DataTypes.STRING,
    productImage: DataTypes.TEXT,
    stock: DataTypes.INTEGER

  })
  Products.asscoiate = function(models){
    Products.belongsTo(models.Category,{
      foreignKey : 'CategoryId'
    })
  }
  
  return Products;
};