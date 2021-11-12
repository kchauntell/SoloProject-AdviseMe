'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      allowNull: false,
    },
    noteBookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.User, {foreignKey: 'userId'});
    Note.belongsTo(models.Notebook, {foreignKey: 'noteBookId'});
    Note.hasMany(models.Advice, {foreignKey: 'notesId'})
  };
  return Note;
};
