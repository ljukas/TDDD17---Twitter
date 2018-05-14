module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('retweet', 'tweet_id', {
        type: Sequelize.STRING,
        references: {
          model: 'tweet',
          key: 'id'
        }
      })
      .then(() => {
        return queryInterface.addColumn('retweet', 'twitter_user_id', {
          type: Sequelize.STRING,
          references: {
            model: 'twitter_user',
            key: 'id'
          }
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('retweet', 'tweet_id').then(() => {
      return queryInterface.removeColumn('retweet', 'twitter_user_id');
    });
  }
};
