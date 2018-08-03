import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Root from '../Root';

class App extends Component {
  render() {
    return (
      <main>
        <Route exact path='/' render={() => (
          <Root />
        )} />
      </main>
    );
  }
}

export default App;
