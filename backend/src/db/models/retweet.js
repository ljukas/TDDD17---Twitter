export default (sequelize, DataTypes) => {
  const Retweet = sequelize.define(
    'retweet',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      }
    },
    {
      tableName: 'retweet',
      underscored: true
    }
  );

  Retweet.associate = models => {
    Retweet.belongsTo(models.User);
    Retweet.belongsTo(models.Tweet);
  };

  return Retweet;
};
