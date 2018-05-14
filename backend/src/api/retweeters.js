import db from '../db/models';
import { client } from './index';
import { Op } from 'sequelize';

export default async id => {
  try {
    const response = await client.get('statuses/retweets', {
      id,
      count: 100
    });
    return await handleResponse(response, id);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const handleResponse = async (response, tweet_id) => {
  if (response.length === 0) {
    console.log('No retweets for this tweet exists.');
    return;
  }
  await Promise.all(
    response.map(async data => {
      const id = data.id_str;
      const user_data = {
        id: data.user.id_str,
        user_name: data.user.name,
        screen_name: data.user.screen_name,
        location: data.user.location,
        followers_count: data.user.followers_count,
        friends_count: data.user.friends_count,
        statuses_count: data.user.statuses_count
      };
      await createUser(user_data);
      await createRetweet(id, data.retweeted_status.id_str, user_data.id);
    })
  );

  // Get all users that retweeted the tweet from the database.
  const users = await retweeters(tweet_id);
  return users;
};

const retweeters = async id => {
  const tweet = await db.Tweet.findOne({
    where: {
      id
    },
    include: [
      {
        model: db.Retweet
      }
    ]
  });
  const retweets = await tweet.retweets;
  const users = await Promise.all(
    retweets.map(async retweet => {
      const user = await db.User.findOne({
        where: {
          id: retweet.twitter_user_id
        }
      });
      const user_data = {
        location: user.location,
        followers_count: user.followers_count,
        friends_count: user.friends_count,
        statuses_count: user.statuses_count
      };
      return user_data;
    })
  );
  console.log(users);
  return users;
};

const createUser = async ({
  id,
  followers_count,
  friends_count,
  statuses_count,
  location
}) => {
  const [twitter_user, user_created] = await db.User.findOrCreate({
    where: {
      id
    },
    defaults: {
      followers_count,
      friends_count,
      statuses_count,
      location
    }
  });
  return twitter_user.dataValues.id;
};

const createRetweet = async (id, tweet_id, twitter_user_id) => {
  const [retweet, created] = await db.Retweet.findOrCreate({
    where: {
      id
    },
    defaults: {
      tweet_id,
      twitter_user_id
    }
  });
};
