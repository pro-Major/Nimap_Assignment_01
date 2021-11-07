'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
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
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};