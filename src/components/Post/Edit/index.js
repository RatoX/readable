import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import Section from '../../styles/Section'
import PostForm from '../Form'
import withPostNotFound from '../../../hoc/utils/withPostNotFound'

const SectionHeader = styled.h1`
  text-tranform: uppercase;
  margin: 10px 0;
`

const PostEdit = ({ id }) => (
  <Section>
    <Link to='/'>
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

PostEdit.propTypes = {
  id: PropTypes.string.required,
}

export default compose(
  withPostNotFound,
)(PostEdit)
