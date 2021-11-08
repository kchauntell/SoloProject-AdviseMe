'use strict';
module.exports = (sequelize, DataTypes) => {
  const Advice = sequelize.define('Advice', {
    advice: DataTypes.TEXT,
    private: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    notesId: DataTypes.INTEGER
  }, {});
  Advice.associate = function(models) {
    // associations can be defined here
  };
  return Advice;
};