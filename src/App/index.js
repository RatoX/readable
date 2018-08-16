import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Category from '../components/Category'
import Post from '../components/Post'
import PostEdit from '../components/Post/Edit'
import ErrorPageBoundary from '../components/ErrorPageBoundary'
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
        <ErrorPageBoundary>
          <Switch>
            <Route exact path='/' render={() => (
              <Category />
            )} />
            <Route exact path='/category/:name' render={({ match }) => (
              <Category type={match.params.name} />
            )} />
            <Route exact path='/post/:id' render={({ match }) => (
              <Post id={match.params.id} />
            )} />
            <Route exact path='/post/:id/edit' render={({ match }) => (
              <PostEdit id={match.params.id} />
            )} />
            <Route render={() => (
              <span> PAGE NOT FOUND 404 </span>
            )} />
          </Switch>
        </ErrorPageBoundary>
      </Main>
    )
  }
}

export default App
