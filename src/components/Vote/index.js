import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, defaultProps, withState } from 'recompose';
import { upVotePost as upVotePostAction, downVotePost as downVotePostAction, upVoteComment as upVoteCommentAction, downVoteComment as downVoteCommentAction } from '../../store/actions'
import styled from 'styled-components'
import Section from '../styles/Section';
import { VoteButtonAdd, VoteButtonRemove } from '../styles/VoteButton';

const ItemContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Vote = ({ id, type = 'post', vote }) => (
  <ItemContainer>
    <VoteButtonAdd onClick={vote(id, 'up', type)}>+</VoteButtonAdd>
    <VoteButtonRemove onClick={vote(id, 'down', type)}>-</VoteButtonRemove>
  </ItemContainer>
)

function mapDispatchToProps (dispatch) {
  return {
    upVotePost: (id) => dispatch(upVotePostAction(id)),
    downVotePost: (id) => dispatch(downVotePostAction(id)),
    upVoteComment: (id) => dispatch(upVoteCommentAction(id)),
    downVoteComment: (id) => dispatch(downVoteCommentAction(id)),
  }
}

export default compose(
  connect(() => ({}), mapDispatchToProps),
  withHandlers({
    vote: ({ upVotePost, upVoteComment, downVotePost, downVoteComment }) => ( id, direction, type ) => event => {
      const upVote = type === 'post' ? upVotePost : upVoteComment
      const downVote = type === 'post' ? downVote : downVoteComment

      if (direction === 'up') {
        upVote(id)
      } else if (direction === 'down') {
        downVote(id)
      }
    },
  })
)(Vote)
