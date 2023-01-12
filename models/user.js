'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // we creating a table which is the combination of both user and role table by using through method or property after migrations
      this.belongsToMany(models.role, {through: "user_roles"});
      // for user has many order and order belongs to user
      this.hasMany(models.order, {
        foreignKey: "userId"
      })
    }
  }
  user.init({
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 20]
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  // this will syncronous
  user.beforeCreate( (user) => {
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashPassword //this line will replace user's actual password with hashed password
  });



  return user;
};