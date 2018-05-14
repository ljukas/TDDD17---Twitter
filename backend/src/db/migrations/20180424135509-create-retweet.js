module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('retweet', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('retweet');
  }
};
