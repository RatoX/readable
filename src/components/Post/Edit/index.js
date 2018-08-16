import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Section from '../../styles/Section'
import PostForm from '../Form'

const SectionHeader = styled.h1`
  text-tranform: uppercase;
  margin: 10px 0;
`

const PostEdit = ({ id }) => (
  <Section>
    <Link to="/">
      {'<'} Back
    </Link>
    <SectionHeader>Edit Post</SectionHeader>
    <Section>
      Edit
      <PostForm
        id={id}
      />
    </Section>
  </Section>
)

export default PostEdit
