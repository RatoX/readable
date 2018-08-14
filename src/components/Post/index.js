import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { compose, lifecycle } from 'recompose';
import { Link } from 'react-router-dom'
import { loadPost as loadPostAction, loadComments as loadCommentsAction } from '../../store/actions'
import Section from '../styles/Section'
import Comments from './Comments'

const Information = Section.extend`
  background-color: #fafafa;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 30px 0;
  position: sticky;
`

const Body = styled.p`
  margin: 15px 0;
`

const Post = ({ id, title, body, author, commentCount, comments }) => (
  <Section>
    <Link to="/">
      {'<'} Back
    </Link>
    <Information>
      <h1>{ title } by { author }</h1>
      <Body>
        { body }
      </Body>
      <small>
        { commentCount } comment(s)
      </small>
    </Information>
    <Comments postId={id} comments={ comments } />
  </Section>
)

function mapDispatchToProps (dispatch) {
  return {
    loadPost: (id) => dispatch(loadPostAction(id)),
    loadComments: (id) => dispatch(loadCommentsAction(id)),
  }
}

function mapStateToProps (state, props) {
  const { id } = props
  const post = state.posts[id] || {}

  return {
    id: props.id,
    title: post.title,
    body: post.body,
    author: post.author,
    commentCount: post.commentCount,
    comments: Object.values(post.comments || {}),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { id, loadPost, loadComments } = this.props

      loadPost(id)
      loadComments(id)
    }
  }),
)(Post)
