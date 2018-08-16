import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, defaultProps, withState } from 'recompose';
import { upVotePost as upVoteAction, downVotePost as downVoteAction } from '../../store/actions'
import styled from 'styled-components'
import Section from '../styles/Section';
import { VoteButtonAdd, VoteButtonRemove } from '../styles/VoteButton';

const ItemContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Vote = ({ postId, vote }) => (
  <ItemContainer>
    <VoteButtonAdd onClick={vote(postId, 'up')}>+</VoteButtonAdd>
    <VoteButtonRemove onClick={vote(postId, 'down')}>-</VoteButtonRemove>
  </ItemContainer>
)

function mapDispatchToProps (dispatch) {
  return {
    upVote: (id) => dispatch(upVoteAction(id)),
    downVote: (id) => dispatch(downVoteAction(id)),
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
  })
)(Vote)
