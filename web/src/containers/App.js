/* Responsible for fetching data and sending it to child components */

import React, { Component } from "react";
import TwitterList from "../containers/twitter_list";
import SearchBar from "./SearchBar";

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
