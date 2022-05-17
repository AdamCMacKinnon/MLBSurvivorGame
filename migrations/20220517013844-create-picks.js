'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('picks', {
      userid: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'userid'
        }
      },
      username: {
        type: Sequelize.STRING
      },
      picks: {
        type: Sequelize.ARRAY(Sequelize.STRING)
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