'use strict';
module.exports = (sequelize, DataTypes) => {
  const Advice = sequelize.define('Advice', {
    advice: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        min:10
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notesId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Advice.associate = function(models) {
    Advice.belongsTo(models.User, {foreignKey: 'userId'});
    Advice.belongsTo(models.Note, {foreignKey: 'notesId'});
  };
  return Advice;
};
