module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tweet', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      retweet_count: {
        type: Sequelize.INTEGER
      },
      favorite_count: {
        type: Sequelize.INTEGER
      },
      cursor: {
        type: Sequelize.INTEGER,
        defaultValue: -1
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
    return queryInterface.dropTable('tweet');
  }
};
