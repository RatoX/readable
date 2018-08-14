import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, defaultProps, withState } from 'recompose';
import { upVote as upVoteAction, downVote as downVoteAction } from '../../../store/actions'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Section from '../../styles/Section';

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

const Title = ItemContainer.withComponent('span').extend`

`

const Date = ItemContainer.withComponent('time').extend`

`

const VoteButton = styled.span`
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;

  + span {
    margin-left: 40px;
  }
`

const VoteButtonAdd = VoteButton.extend`
  color: #204ecf;
`

const VoteButtonRemove = VoteButton.extend`
  color: #e62857;
`


const validateKey = (key, object) => {
  if (!object[key]) {
    console.error(`${key} does not exists as key, available keys: ${Object.keys(object)} `)
  }
}

const ordering = (by, isAsc) => (x, y) => {
  validateKey(by, x)
  validateKey(by, y)

  if (isAsc) {
    return `${x[by]}`.localeCompare(`${y[by]}`)
  }

  return `${y[by]}`.localeCompare(`${x[by]}`)
}

const PostsSection = ({ posts, sortBy, isAsc, sort, vote }) => (
  <Section>
    <h1>all posts, sort by: {sortBy} {isAsc ? 'asc' : 'desc'}</h1>
    <List>
      <ItemHeader>
        <span>vote</span>
        <span onClick={sort('voteScore')}>score</span>
        <span onClick={sort('title')}>title</span>
        <span onClick={sort('timestamp')}>date</span>
        <span>category</span>
        <span>comments</span>
      </ItemHeader>
    { posts.sort(ordering(sortBy, isAsc)).map((p, index) => (
      <Item key={index} >
        <ItemContainer>
          <VoteButtonAdd onClick={vote(p.id, 'up')}>+</VoteButtonAdd>
          <VoteButtonRemove onClick={vote(p.id, 'down')}>-</VoteButtonRemove>
        </ItemContainer>
        <Score>{ p.voteScore }</Score>
        <Title>
          <Link to={`/post/${p.id}`}>
            { p.title }
          </Link>
        </Title>
        <Date>{ p.timestamp }</Date>
        <ItemContainer>{ p.category }</ItemContainer>
        <ItemContainer>{ p.commentCount }</ItemContainer>
      </Item>
    ))}
    </List>
  </Section>
)

function mapDispatchToProps (dispatch) {
  return {
    upVote: (id) => dispatch(upVoteAction(id)),
    downVote: (id) => dispatch(downVoteAction(id)),
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
    }
  })
)(PostsSection)
