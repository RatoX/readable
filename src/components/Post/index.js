import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { compose, lifecycle } from 'recompose'
import { Link } from 'react-router-dom'
import { loadPost as loadPostAction, loadComments as loadCommentsAction } from '../../store/actions'
import Section from '../styles/Section'
import withPostNotFound from '../../hoc/utils/withPostNotFound'
import makeCancelable from '../../utils/makeCancelable'
import Comments from './Comments'
import Actions from './Actions'
import Vote from '../Vote'

const Information = Section.extend`
  background-color: #fafafa;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 30px 0;
  position: sticky;
`

const Body = styled.p`
  margin: 15px 0;
`

const Post = ({ id, title, body, author, commentCount, comments, voteScore, category }) => (
  <Section>
    <Link to='/'>
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
      <small>
        { voteScore } total of votes
        <Vote id={id} />
      </small>
      <Section>
        <Actions id={id} category={category} />
      </Section>
    </Information>
    <Comments postId={id} comments={comments} />
  </Section>
)


Post.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string,
  commentCount: PropTypes.number,
  comments: PropTypes.array,
  voteScore: PropTypes.number,
  category: PropTypes.string,
}

function mapDispatchToProps (dispatch, props) {
  const { id } = props

  return {
    loadingCommentsPromise: makeCancelable(dispatch(loadCommentsAction(id))),
    loadingPostPromise: makeCancelable(dispatch(loadPostAction(id))),
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
    voteScore: post.voteScore,
    category: post.category,
    comments: Object.values(post.comments || {}),
  }
}

export default compose(
  withPostNotFound,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillUnmount () {
      const { loadingPostPromise, loadingCommentsPromise } = this.props

      loadingPostPromise.cancel()
      loadingCommentsPromise.cancel()
    },
  }),
)(Post)
