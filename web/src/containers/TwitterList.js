import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRetweeters } from '../actions';
import { Bar, Pie } from 'react-chartjs';

class TwitterList extends Component {
  renderTweetInfo() {
    return (
      <div className="tweet-info-div">
        <div>
          <span>Text: </span>
          {this.props.tweet.tweet_data.text}
        </div>
        <div>
          <span>Retweet count: </span>
          {this.props.tweet.tweet_data.retweet_count}
        </div>
        <div>
          <span>Favorite count: </span>
          {this.props.tweet.tweet_data.favorite_count}
        </div>
        <div>
          <span>Username: </span>
          {this.props.tweet.user_data.user_name}
        </div>
        <div>
          <span>Location: </span>
          {this.props.tweet.user_data.location}
        </div>
        <div>
          <span>Followers: </span>
          {this.props.tweet.user_data.followers_count}
        </div>
        <div>
          <span>Friends: </span>
          {this.props.tweet.user_data.friends_count}
        </div>
        <div>
          <span>Statuses: </span>
          {this.props.tweet.user_data.statuses_count}
        </div>
      </div>
    );
  }

  renderLocationInfo() {
    if (Object.keys(this.props.retweeters).length === 0) {
      return <div>Loading...</div>;
    }

    /* this.props.retweeters == [{location: 'Sweden'},{location: 'USA'},{location: 'Sweden'}{location: 'Russia'} ]
      => { 'Sweden': 2, 'USA': 1, 'Russia': 1 }
   */

    // We only care about the location
    const locations = this.props.retweeters.map(retweet => {
      return retweet.location;
    }); /* => [Sweden, USA, Sweden, Russia]*/

    // List of unique locations
    const uniqueLocationsSet = new Set(locations);
    // Transform the set into an array
    const uniqueLocations = [...uniqueLocationsSet];

    // Calculate number of retweeters from same location
    const locationsCount = {};
    uniqueLocations.map(elem => {
      let count = locations.reduce((p, c) => {
        if (c === elem) {
          p++;
        }
        return p;
      }, 0);

      locationsCount[elem] = count;
    }); // => { 'USA': 1, 'Sweden': 2, 'Russia': 1} */

    /* Transform locations into an array */
    let sortedLocationsArray = [];
    for (let country in locationsCount) {
      sortedLocationsArray.push([country, locationsCount[country]]);
    }

    // Sort locations in descending order
    sortedLocationsArray.sort(function(a, b) {
      return b[1] - a[1];
    });

    // Transform sorted locations back into an object
    const sortedLocations = {};
    sortedLocationsArray.map(country => {
      if (country[1] > 1 && country[0] !== '') {
        sortedLocations[country[0]] = country[1];
      }
    });

    const locationData = {
      labels: Object.keys(sortedLocations),
      datasets: [
        {
          label: 'Location dataset',
          fillColor: 'rgba(220,220,220,0.5)',
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: Object.values(sortedLocations)
        }
      ]
    };

    return <Bar data={locationData} width="800" height="300" />;
  }

  // Type can be followers/friends/statuses
  renderPieInfo(type) {
    if (Object.keys(this.props.retweeters).length === 0) {
      return <div>Loading...</div>;
    }

    let retweeterData = [];
    if (type === 'followers') {
      retweeterData = this.props.retweeters.map(retweet => {
        return retweet.followers_count;
      });
    } else if (type === 'friends') {
      retweeterData = this.props.retweeters.map(retweet => {
        return retweet.friends_count;
      });
    } else if (type === 'statuses') {
      retweeterData = this.props.retweeters.map(retweet => {
        return retweet.statuses_count;
      });
    }

    let red = 0;
    let green = 0;
    let yellow = 0;
    // Count the data of different intervals
    retweeterData.map(function(number) {
      if (number < 100) {
        red++;
      } else if (100 < number && number < 1000) {
        green++;
      } else if (1000 < number) {
        yellow++;
      }
    });

    const pieData = [
      {
        value: red,
        color: '#F7464A',
        highlight: '#FF5A5E',
        label: 'Red'
      },
      {
        value: green,
        color: '#46BFBD',
        highlight: '#5AD3D1',
        label: 'Green'
      },
      {
        value: yellow,
        color: '#FDB45C',
        highlight: '#FFC870',
        label: 'Yellow'
      }
    ];

    return (
      <div>
        <div className="pie-header-wrapper">
          <div className="pie-header-red" />
          <span>x &lt; 100</span>
          <div className="pie-header-green" />
          <span>100 &lt; x &lt; 1000</span>
          <div className="pie-header-yellow" />
          <span>x &gt; 1000</span>
        </div>
        <div>
          <Pie data={pieData} width="500" height="250" />
        </div>
      </div>
    );
  }

  render() {
    if (Object.keys(this.props.tweet).length === 0) {
      return <div>Waiting on input...</div>;
    }

    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Tweet information</th>
              <th>Retweeter Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tweet-info">{this.renderTweetInfo()}</td>
              <td>{this.renderLocationInfo()}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Retweeter Followers</th>
              <th>Retweeter Friends</th>
              <th>Retweeter Statuses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pie-wrapper">{this.renderPieInfo('followers')}</td>
              <td className="pie-wrapper">{this.renderPieInfo('friends')}</td>
              <td className="pie-wrapper">{this.renderPieInfo('statuses')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ tweet, retweeters }) {
  return { tweet, retweeters };
}

export default connect(mapStateToProps, { fetchRetweeters })(TwitterList);
