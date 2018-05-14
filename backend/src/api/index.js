import { Router } from 'express';
import Twitter from 'twitter';
import HttpStatus from 'http-status-codes';
import getTweet from './tweet';
import getRetweeters from './retweeters';
import subscribe from './subscribe';

export const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

const routes = Router();

/**
 * GET home page
 */
routes.get('/tweet/:id', (req, res) => {
  getTweet(req.params.id)
    .then(data => {
      res.status(HttpStatus.OK).send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error);
    });
});

routes.get('/tweet/:id/retweeters', (req, res) => {
  getRetweeters(req.params.id)
    .then(data => {
      res.status(HttpStatus.OK).send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error);
    });
});

routes.post('/subscribe/:screen_name', (req, res) => {
  subscribe(req.params.screen_name)
    .then(success => {
      if (success) {
        res
          .status(HttpStatus.OK)
          .send(`Subscription setup on ${req.params.screen_name}`);
      } else {
        res
          .status(HttpStatus.TOO_MANY_REQUESTS)
          .send(`Already subscribing on ${req.params.screen_name}`);
      }
    })
    .catch(error => {
      res.status(HttpStatus.BAD_REQUEST).send(error);
    });
});

export default routes;
