# TDDD17---Twitter

## How to run

The first thing to do is the create an app at Twitter so you get the four API-keys that are needed to talk to the Twitter API. You can create these keys at [here](http://apps.twitter.com). The keys needs to be added to a file called _.env_ in the backend directory. You need to save them to specific names, these names can be found in the _index.js_ file inside _backend/src/api_.

This project runs using docker containers, the easiest way to run it is to run the docker-compose file at the top. It will setup everything for you.

After this is done, you need to enter the backend-container and run the command: `sequelize db:migrate` to setup the database. When this is done you can start to examine tweets live.

The frontend can be accessed at _http://localhost:3000_.

## How to use

### Regular

Enter any tweet ID into the searchbar at the top. The tweet ID is the long number at the end of the url when clicking on any tweet on twitter.

### Subscribe

To use subscribe you click in the checkmark next to the searchbar and in the searchbar you enter the screen-name of any user. This is the name in the url when you visit a user on twitter. The subscribe feature will start collecting data on that users next tweet.
