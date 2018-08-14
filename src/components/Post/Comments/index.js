import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
 > :nth-child(odd) {
   background-color: #cecece;
 }
`
const ListItem = styled.li`


`

const Comment = ({ body }) => (
  <ListItem>
    {body}
  </ListItem>
)

const Comments = ({ comments }) => (
  <List>
    { comments && comments.map((c) => (
      <Comment
        key={c.id}
        body={c.body}
      />
    )) }
  </List>
)


export default Comments
