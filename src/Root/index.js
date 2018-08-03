import React from 'react';
import { connect } from 'react-redux';

const Root = ({ posts }) => (
  <section>
    <h1>all posts</h1>
    { posts.map((p, index) => (
      <span key={index} >{ p.title }</span>
    ))}
  </section>
)

function mapStateToProps (state) {
  console.log(Object.values(state.posts)[0].title, '<<')
  return {
    posts: Object.values(state.posts),
  }
}


function addPost ({ title }) {
  return {
    type: 'ADD_POST',
    title
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
