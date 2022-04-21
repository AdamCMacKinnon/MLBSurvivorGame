'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('picks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING
      },
      week1: {
        type: Sequelize.STRING
      },
      week2: {
        type: Sequelize.STRING
      },
      week3: {
        type: Sequelize.STRING
      },
      week4: {
        type: Sequelize.STRING
      },
      week5: {
        type: Sequelize.STRING
      },
      week6: {
        type: Sequelize.STRING
      },
      week7: {
        type: Sequelize.STRING
      },
      week8: {
        type: Sequelize.STRING
      },
      week9: {
        type: Sequelize.STRING
      },
      week10: {
        type: Sequelize.STRING
      },
      week11: {
        type: Sequelize.STRING
      },
      week12: {
        type: Sequelize.STRING
      },
      week13: {
        type: Sequelize.STRING
      },
      week14: {
        type: Sequelize.STRING
      },
      week15: {
        type: Sequelize.STRING
      },
      week16: {
        type: Sequelize.STRING
      },
      week17: {
        type: Sequelize.STRING
      },
      week18: {
        type: Sequelize.STRING
      },
      week19: {
        type: Sequelize.STRING
      },
      week20: {
        type: Sequelize.STRING
      },
      week21: {
        type: Sequelize.STRING
      },
      week22: {
        type: Sequelize.STRING
      },
      week23: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('picks');
  }
};