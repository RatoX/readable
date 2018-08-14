import React from 'react'
import styled from 'styled-components'
import Section from '../../styles/Section'
import Comment from '../Comment'

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

const Comments = ({ comments }) => (
  <Section>
    <h1>Comments</h1>
    <List>
      { comments && comments.sort((c1, c2) => c1.voteScore <= c2.voteScore).map((c) => (
        <Comment
          key={c.id}
          id={c.id}
          author={c.author}
          body={c.body}
          voteScore={c.voteScore}
        />
      )) }
    </List>
  </Section>
)

export default Comments
