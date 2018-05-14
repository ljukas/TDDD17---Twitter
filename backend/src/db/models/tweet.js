export default (sequelize, DataTypes) => {
  const Tweet = sequelize.define(
    'tweet',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      retweet_count: {
        type: DataTypes.INTEGER
      },
      favorite_count: {
        type: DataTypes.INTEGER
      },
      cursor: {
        type: DataTypes.INTEGER,
        defaultValue: -1
      }
    },
    {
      tableName: 'tweet',
      underscored: true
    }
  );

  Tweet.associate = models => {
    Tweet.belongsTo(models.User);
    Tweet.hasMany(models.Retweet);
  };

  return Tweet;
};
