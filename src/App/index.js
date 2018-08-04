import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Root from '../Root';
import styled from 'styled-components'

const Main = styled.main`
  box-sizing: border-box;
  margin-top: 20px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

class App extends Component {
  render() {
    return (
      <Main>
        <Route exact path='/' render={() => (
          <Root />
        )} />
      </Main>
    );
  }
}

export default App;
