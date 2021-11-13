'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 50]
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50]
      }
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Notebook.associate = function(models) {
    Notebook.belongsTo(models.User,{foreignKey: 'userId'});
    Notebook.hasMany(models.Note, {foreignKey: 'noteBookId', onDelete: 'CASCADE', hooks: true})
  };
  return Notebook;
};
