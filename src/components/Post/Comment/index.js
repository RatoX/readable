import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { VoteButtonAdd, VoteButtonRemove } from '../../styles/VoteButton'
import TextAction from '../../styles/TextAction'
import Vote from '../../Vote'
import { deleteComment as deleteCommentAction } from '../../../store/actions'

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

const Comment = ({ id, body, author, voteScore, deleteComment }) => (
  <ListItem>
    <section>
      <Votes>{ voteScore } votes</Votes> {body} <Author>by {author}</Author>
    </section>
    <VoteButtons>
      <Vote id={id} type="comment" />
    </VoteButtons>
    <TextAction onClick={deleteComment(id)}>
      delete
    </TextAction>
  </ListItem>
)

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (id) => dispatch(deleteCommentAction(id)),
  }
}

export default compose(
  connect(() => ({}), mapDispatchToProps),
  withHandlers({
    deleteComment: ({ deleteComment }) => ( id ) => event => {
      deleteComment(id)
    },
  })
)(Comment)
