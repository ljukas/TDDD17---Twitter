module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('twitter_user', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING
      },
      followers_count: {
        type: Sequelize.INTEGER
      },
      friends_count: {
        type: Sequelize.INTEGER
      },
      statuses_count: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('twitter_user');
  }
};
