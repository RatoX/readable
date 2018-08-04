import React from 'react'
import styled from 'styled-components'
import Section from '../../styles/Section'

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Item = styled.li`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-out;
  background-color: #FFF;
  color: #000;

  :hover {
    background-color: #AEAEAE;
    color: #FFF;
  }
`

const CategoriesHeader = ({ categories }) => (
  <Section>
    <h1>Categories</h1>
    <List>
      {categories && categories.map((c, i) => (
        <Item key={i} >{ c.name }</Item>
      ))}
    </List>
  </Section>
)

export default CategoriesHeader
