import React, { Component } from 'react';
import TwitterList from '../containers/twitter_list';
import { connect } from 'react-redux';
import { fetchTweet, fetchRetweeters, initSubscription } from '../actions';

const containerStyle = {
  width: '50%',
  textAlign: 'center',
  margin: '20px auto'
};

const searchStyle = {
  width: '60%',
  margin: 'auto 10px'
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      checked: false
    };
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  // componentDidMount() {
  //   const id = "993005360050003968";
  // }
  searchSubmit(event) {
    event.preventDefault();
    if (this.state.checked) {
      this.props.initSubscription(this.state.term);
    } else {
      this.props.fetchTweet(this.state.term);
      setTimeout(this.props.fetchRetweeters(this.state.term), 1000);
    }
  }

  render() {
    return (
      <form style={containerStyle} onSubmit={this.searchSubmit}>
        <span className="font-weight-bold">Enter tweet id:</span>
        <input
          style={searchStyle}
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value })}
        />
        <span style={{ margin: '10px' }}>Subscribe:</span>
        <input
          type="checkbox"
          value={this.state.checked}
          checked={this.state.checked}
          onClick={event => this.setState({ checked: event.target.checked })}
        />
      </form>
    );
  }
}

export default connect(null, { fetchTweet, fetchRetweeters, initSubscription })(
  SearchBar
);
