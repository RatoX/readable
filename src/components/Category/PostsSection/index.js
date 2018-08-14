import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, defaultProps, withState } from 'recompose';
import { upVotePost as upVoteAction, downVotePost as downVoteAction, deletePost as deletePostAction } from '../../../store/actions'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Section from '../../styles/Section';
import { VoteButtonAdd, VoteButtonRemove } from '../../styles/VoteButton';
import TextAction from '../../styles/TextAction';

const List = styled.ol`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%

  > li:nth-child(odd) {
    background-color: #cecece;
  }

  > li:nth-child(1) {
    background-color: #000;
    color: #fff;
  }
`

const Item = styled.li`
  width: 100%
  display: flex;
  justify-content: space-around;

  + li {
    margin-top: 15px;
  }
`

const ItemHeader = Item.extend`
  font-weight: bold;
  padding: 15px 0;
  text-transform: uppercase;
`

const ItemContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Score = ItemContainer.withComponent('small').extend`

`

const Date = ItemContainer.withComponent('time').extend`

`

const ordering = (by, isAsc) => (x, y) => {
  if (isAsc) {
    return `${x[by]}`.localeCompare(`${y[by]}`)
  }

  return `${y[by]}`.localeCompare(`${x[by]}`)
}

const PostsSection = ({ posts, sortBy, isAsc, sort, vote, deletePost }) => (
  <Section>
    <h1>all posts, sort by: {sortBy} {isAsc ? 'asc' : 'desc'}</h1>
    <List>
      <ItemHeader>
        <span>vote</span>
        <span onClick={sort('voteScore')}>score</span>
        <span onClick={sort('title')}>title</span>
        <span onClick={sort('timestamp')}>date</span>
        <span onClick={sort('commentCount')}>comments</span>
        <span>category</span>
        <span></span>
      </ItemHeader>
      { posts.filter(p => !p.deleted).sort(ordering(sortBy, isAsc)).map((p, index) => (
      <Item key={index} >
        <ItemContainer>
          <VoteButtonAdd onClick={vote(p.id, 'up')}>+</VoteButtonAdd>
          <VoteButtonRemove onClick={vote(p.id, 'down')}>-</VoteButtonRemove>
        </ItemContainer>
        <Score>{ p.voteScore }</Score>
        <TextAction>
          <Link to={`/post/${p.id}`}>
            { p.title }
          </Link>
        </TextAction>
        <Date>{ p.timestamp }</Date>
        <ItemContainer>{ p.commentCount }</ItemContainer>
        <ItemContainer>{ p.category }</ItemContainer>
        <TextAction onClick={deletePost(p.id)}>
          delete
        </TextAction>
      </Item>
    ))}
    </List>
  </Section>
)

function mapDispatchToProps (dispatch) {
  return {
    upVote: (id) => dispatch(upVoteAction(id)),
    downVote: (id) => dispatch(downVoteAction(id)),
    deletePost: (id) => dispatch(deletePostAction(id)),
  }
}

export default compose(
  connect(() => ({}), mapDispatchToProps),
  defaultProps({
    posts: [],
  }),
  withState('sortBy', 'setSortBy', 'voteScore'),
  withState('isAsc', 'setIsAsc', true),
  withHandlers({
    sort: ({ sortBy, isAsc, setSortBy, setIsAsc }) => newSortBy => event => {
      if (sortBy === newSortBy) {
        setIsAsc(!isAsc)
      } else {
        setIsAsc(true)
      }

      setSortBy(newSortBy)
    },

    vote: ({ upVote, downVote }) => ( id, type ) => event => {
      if (type === 'up') {
        upVote(id)
      } else if (type === 'down') {
        downVote(id)
      }
    },

    deletePost: ({ deletePost }) => ( id ) => event => {
      deletePost(id)
    }
  })
)(PostsSection)
