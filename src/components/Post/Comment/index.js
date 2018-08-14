import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { VoteButtonAdd, VoteButtonRemove } from '../../styles/VoteButton'
import TextAction from '../../styles/TextAction'
import { upVoteComment as upVoteAction, downVoteComment as downVoteAction, deleteComment as deleteCommentAction } from '../../../store/actions'

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

const Comment = ({ id, body, author, voteScore, vote, deleteComment }) => (
  <ListItem>
    <section>
      <Votes>{ voteScore } votes</Votes> {body} <Author>by {author}</Author>
    </section>
    <VoteButtons>
      <VoteButtonAdd onClick={vote(id, 'up')}>+</VoteButtonAdd>
      <VoteButtonRemove onClick={vote(id, 'down')}>-</VoteButtonRemove>
    </VoteButtons>
    <TextAction onClick={deleteComment(id)}>
      delete
    </TextAction>
  </ListItem>
)

function mapDispatchToProps (dispatch) {
  return {
    upVote: (id) => dispatch(upVoteAction(id)),
    downVote: (id) => dispatch(downVoteAction(id)),
    deleteComment: (id) => dispatch(deleteCommentAction(id)),
  }
}

export default compose(
  connect(() => ({}), mapDispatchToProps),
  withHandlers({
    vote: ({ upVote, downVote }) => ( id, type ) => event => {
      if (type === 'up') {
        upVote(id)
      } else if (type === 'down') {
        downVote(id)
      }
    },

    deleteComment: ({ deleteComment }) => ( id ) => event => {
      deleteComment(id)
    },
  })
)(Comment)
