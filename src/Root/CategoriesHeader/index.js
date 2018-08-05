import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
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
  }
`

const StyledLink = styled(NavLink)`
  width: 100%;
  text-align: center;
  display: block;

  &.active {
    background-color: #c8c8c8;
    color: #FFF;
  }
`

const CategoriesHeader = ({ categories }) => (
  <Section>
    <h1>Categories</h1>
    <List>
      <Item>
        <StyledLink exact to="/">
          all
        </StyledLink>
      </Item>
      {categories && categories.map((c, i) => (
        <Item key={i} >
          <StyledLink exact to={`/category/${c.path}`}>
            { c.name }
          </StyledLink>
        </Item>
      ))}
    </List>
  </Section>
)

export default CategoriesHeader
