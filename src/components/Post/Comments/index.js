import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Section from '../../styles/Section'
import Comment from '../Comment'
import { connect } from 'react-redux'
import { compose, withState, withHandlers } from 'recompose'
import { addComment as addCommentAction } from '../../../store/actions'

const List = styled.ul`
  margin-top: 15px;
  width: 100%;

  > :nth-child(odd) {
    background-color: #cecece;
  }

  > :last-child {
    border-bottom: 1px solid #cecece;
  }
`

const Footer = Section.extend`

`

const Comments = ({ postId, comments, author, body, setAuthor, setBody, addComment }) => (
  <Section>
    <h1>Comments</h1>
    <List>
      { comments && comments.filter(c => !c.deleted).sort((c1, c2) => c1.voteScore <= c2.voteScore).map((c) => (
        <Comment
          key={c.id}
          id={c.id}
          author={c.author}
          body={c.body}
          voteScore={c.voteScore}
        />
      )) }
    </List>
    <Footer>
      <label htmlFor='author'>Author</label>
      <input id='author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} />

      <label htmlFor='body'>Comment</label>
      <textarea id='body' cols='30' rows='10' value={body} onChange={(e) => setBody(e.target.value)} />
      <button disabled={!author.trim() || !body.trim()} onClick={addComment(postId)}>
        add comment
      </button>
    </Footer>
  </Section>
)

Comments.propTypes = {
  postId: PropTypes.string,
  comments: PropTypes.array,
  author: PropTypes.string,
  body: PropTypes.string,
  setAuthor: PropTypes.func,
  setBody: PropTypes.func,
  addComment: PropTypes.func,
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (postId, { author, body }) => dispatch(addCommentAction(postId, { author, body })),
  }
}

export default compose(
  connect(() => ({}), mapDispatchToProps),
  withState('author', 'setAuthor', ''),
  withState('body', 'setBody', ''),
  withHandlers({
    addComment: ({ addComment, author, body, setAuthor, setBody }) => (postId) => () => {
      addComment(postId, { author, body })
      setAuthor('')
      setBody('')
    }
  })
)(Comments)
