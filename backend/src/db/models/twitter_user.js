export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'twitter_user',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      location: DataTypes.STRING,
      followers_count: DataTypes.INTEGER,
      friends_count: DataTypes.INTEGER,
      statuses_count: DataTypes.INTEGER
    },
    {
      tableName: 'twitter_user',
      underscored: true
    }
  );

  User.associate = models => {
    User.hasMany(models.Tweet);
    User.hasMany(models.Retweet);
  };

  return User;
};
