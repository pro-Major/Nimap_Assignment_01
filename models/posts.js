'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts',{
    
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    category: DataTypes.INTEGER
  },{
    freezeTableName : true,
    tableName : 'Posts'
  })
  Posts.asscoiate = function(models){
    Posts.belongsTo(models.Users,{
      foreignKey : 'created_by'
    }),
    Posts.belongsTo(models.Category,{
      foreignKey : 'category'
    })
  }



  return Posts;
};