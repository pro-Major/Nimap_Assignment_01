'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category',{
    categoryName: DataTypes.STRING,
    isActive: {
      type : DataTypes.BOOLEAN,
      defaultValue : true
    }
  })
  Category.associate = function (models) {
    Category.hasMany(models.Products, {
      foreignKey: 'CategoryId'
    })
  }

  return Category;
};