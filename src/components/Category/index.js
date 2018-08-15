import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import CategoriesHeader from './CategoriesHeader';
import PostsSection from './PostsSection';
import Section from '../styles/Section';
import { loadPostsFromCategory as loadPostsFromCategoryAction } from '../../store/actions'

const Category = ({ type = 'all', posts, categories }) => (
  <Section>
    <CategoriesHeader
      categories={categories}
      />
    <PostsSection
      posts={posts}
      />
  </Section>
)

function mapStateToProps (state, { type = 'all' }) {
  const byType = (p) => type === 'all' || p.category === type
  const shouldHaveId = (p) => p.id

  return {
    posts: Object.values(state.posts).filter(byType).filter(shouldHaveId),
    categories: state.categories,
    type,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPostsFromCategory: (id) => dispatch(loadPostsFromCategoryAction(id)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { loadPostsFromCategory, type } = this.props

      loadPostsFromCategory(type)
    }
  }),
)(Category)
