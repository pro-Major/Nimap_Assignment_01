'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category',{
    categoryName: DataTypes.STRING,
    isActive: {
      type : DataTypes.BOOLEAN,
      defaultValue : true
    }
  },{
    freezeTableName : true,
    tableName : 'Category'
  })
  Category.associate = function (models) {
    Category.hasMany(models.Products, {
      foreignKey: 'categoryId'
    })
    Category.hasMany(models.Posts,{
      foreignKey : 'category'
    })
  }
  return Category;
};