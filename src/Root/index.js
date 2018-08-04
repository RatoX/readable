import React from 'react';
import { connect } from 'react-redux';
import CategoriesHeader from './CategoriesHeader';
import PostsSection from './PostsSection';
import Section from '../styles/Section';

const Root = ({ posts, categories }) => (
  <Section>
    <CategoriesHeader
      categories={categories}
      />
    <PostsSection
      posts={posts}
      />
  </Section>
)

function mapStateToProps (state) {
  return {
    posts: state.posts,
    categories: state.categories,
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
