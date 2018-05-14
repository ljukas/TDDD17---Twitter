module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tweet', 'twitter_user_id', {
      type: Sequelize.STRING,
      references: {
        model: 'twitter_user',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tweet', 'twitter_user_id');
  }
};
