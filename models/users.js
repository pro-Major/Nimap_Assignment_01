'use strict';

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users',{

      name: DataTypes.STRING,
      email: DataTypes.STRING,
      number: DataTypes.STRING,
      password: DataTypes.STRING,
      roles: {
        type : DataTypes.STRING,
        defaultValue: "user",
      }
    },{
      freezeTableName : true,
      tableName : 'Users'
    });

    Users.associate = function (models) {
      Users.hasMany(models.Posts,{
        foreignKey : 'created_by'
      })
    }



  return Users;
};