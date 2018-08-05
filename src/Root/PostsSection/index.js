import React from 'react';
import { compose, withHandlers, defaultProps, withState } from 'recompose';
import styled from 'styled-components'
import Section from '../../styles/Section';

const List = styled.ol`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%
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

const PostsSection = ({ posts, sortBy, isAsc, onClick }) => (
  <Section>
    <h1>all posts, sort by: {isAsc ? 'asc' : 'desc'} {sortBy}</h1>
    <List>
      <ItemHeader>
        <span onClick={onClick('voteScore')}>score</span>
        <span onClick={onClick('title')}>title</span>
        <span onClick={onClick('timestamp')}>date</span>
        <span>category</span>
      </ItemHeader>
    { posts.sort(ordering(sortBy, isAsc)).map((p, index) => (
      <Item key={index} >
        <Score>{ p.voteScore }</Score>
        <Title>{ p.title }</Title>
        <Date>{ p.timestamp }</Date>
        <ItemContainer>{ p.category }</ItemContainer>
      </Item>
    ))}
    </List>
  </Section>
)

export default compose(
  defaultProps({
    posts: [],
  }),
  withState('sortBy', 'setSortBy', 'voteScore'),
  withState('isAsc', 'setIsAsc', true),
  withHandlers({
    onClick: ({ sortBy, isAsc, setSortBy, setIsAsc }) => newSortBy => event => {
      if (sortBy === newSortBy) {
        setIsAsc(!isAsc)
      } else {
        setIsAsc(true)
      }

      setSortBy(newSortBy)
    }
  })
)(PostsSection)
