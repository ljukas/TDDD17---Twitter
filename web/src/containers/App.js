import React, { Component } from 'react';
import TwitterList from './TwitterList';
import SearchBar from './SearchBar';

class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <TwitterList />
      </div>
    );
  }
}

export default App;
