import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { VoteButtonAdd, VoteButtonRemove } from '../../styles/VoteButton'
import TextAction from '../../styles/TextAction'
import Vote from '../../Vote'
import { deleteComment as deleteCommentAction, editComment as editCommentAction } from '../../../store/actions'

const ListItem = styled.li`
  width: 100%;
  text-align: center;
  padding: 10px 0;
`

const Author = styled.small`
  font-style: italic;
`

const Votes = styled.small`
  font-weight: bold;
  margin-right: 10px;
`

const VoteButtons = styled.section`
  margin-left: auto;
`

const Comment = ({ id, body, author, newBody, newAuthor, voteScore, editMode, setEditMode, setAuthor, setBody, deleteComment, saveComment }) => (
  <ListItem>
    <section>
      { !editMode && (
        <React.Fragment>
          <Votes>{ voteScore } votes</Votes> {body} <Author>by {author}</Author>
        </React.Fragment>
      )}
      { editMode && (
        <React.Fragment>
          <Votes>{ voteScore } votes</Votes>
          <textarea value={newBody} onChange={(e) => setBody(e.target.value)} />
          <Author>by
            <input type='text' value={newAuthor} onChange={(e) => setAuthor(e.target.value)} />
          </Author>
        </React.Fragment>
      )}
    </section>
    <VoteButtons>
      <Vote id={id} type='comment' />
    </VoteButtons>
    { !editMode && (
      <React.Fragment>
        <TextAction onClick={() => setEditMode(true)}>
          edit
        </TextAction>
        <TextAction onClick={deleteComment(id)}>
          delete
        </TextAction>
      </React.Fragment>
    )}
    { editMode && (
      <TextAction onClick={saveComment(id)}>
        save
      </TextAction>
    )}
  </ListItem>
)

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (id) => dispatch(deleteCommentAction(id)),
    editComment: ({ id, author, body }) => dispatch(editCommentAction({ id, author, body })),
  }
}

export default compose(
  connect(() => ({}), mapDispatchToProps),
  withState('editMode', 'setEditMode', false),
  withState('newBody', 'setBody', ({ body }) => body),
  withState('newAuthor', 'setAuthor', ({ author }) => author),
  withHandlers({
    deleteComment: ({ deleteComment }) => ( id ) => event => {
      deleteComment(id)
    },

    saveComment: ({ newAuthor, newBody, setEditMode, editComment }) => ( id ) => event => {
      editComment({
        id,
        author: newAuthor,
        body: newBody,
      })
      setEditMode(false)
    },
  })
)(Comment)
