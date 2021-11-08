'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    notesId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
  };
  return Notebook;
};