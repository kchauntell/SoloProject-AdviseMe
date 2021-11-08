'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    note: DataTypes.TEXT,
    private: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    noteBookId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};