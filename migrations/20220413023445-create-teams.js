'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team: {
        type: Sequelize.STRING
      },
      week1: {
        type: Sequelize.BOOLEAN
      },
      week2: {
        type: Sequelize.BOOLEAN
      },
      week3: {
        type: Sequelize.BOOLEAN
      },
      week4: {
        type: Sequelize.STRING
      },
      week5: {
        type: Sequelize.BOOLEAN
      },
      week6: {
        type: Sequelize.BOOLEAN
      },
      week7: {
        type: Sequelize.BOOLEAN
      },
      week8: {
        type: Sequelize.BOOLEAN
      },
      week9: {
        type: Sequelize.BOOLEAN
      },
      week10: {
        type: Sequelize.BOOLEAN
      },
      week11: {
        type: Sequelize.BOOLEAN
      },
      week12: {
        type: Sequelize.BOOLEAN
      },
      week13: {
        type: Sequelize.BOOLEAN
      },
      week14: {
        type: Sequelize.BOOLEAN
      },
      week15: {
        type: Sequelize.BOOLEAN
      },
      week16: {
        type: Sequelize.BOOLEAN
      },
      week17: {
        type: Sequelize.BOOLEAN
      },
      week18: {
        type: Sequelize.BOOLEAN
      },
      week19: {
        type: Sequelize.BOOLEAN
      },
      week20: {
        type: Sequelize.BOOLEAN
      },
      week21: {
        type: Sequelize.BOOLEAN
      },
      week22: {
        type: Sequelize.BOOLEAN
      },
      week23: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};