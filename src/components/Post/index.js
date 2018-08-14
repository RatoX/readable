import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { compose, lifecycle } from 'recompose';
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

const Post = ({ title, body, author, commentCount, comments }) => (
  <Section>
    <Information>
      <h1>{ title } by { author }</h1>
      <Body>
        { body }
      </Body>
      <small>
        { commentCount } comment(s)
      </small>
    </Information>
    <Comments comments={ comments } />
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

  return {
    id: props.id,
    ...state.posts[id]
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
