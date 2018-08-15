import React from 'react'
import Section from '../../styles/Section'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose, lifecycle, withState, withProps, withHandlers } from 'recompose'
import { addPost as addPostAction } from '../../../store/actions'

const SectionInline = Section.extend`
  flex-direction: row;
  justify-content: center;
`

const Form = ({ author, title, body, categories, category, setCategory, setAuthor, setTitle, setBody, addPost }) => (
  <Section>
    <SectionInline>
      <label htmlFor="title">Title: </label>
      <input id="title" type="text" onChange={(e) => setTitle(e.target.value)} />
    </SectionInline>
    <SectionInline>
      <label htmlFor="author">Author: </label>
      <input id="author" type="text" onChange={(e) => setAuthor(e.target.value)} />
    </SectionInline>
    <SectionInline>
      <label htmlFor="category">Category: </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>----- select -----</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>
    </SectionInline>

    <label htmlFor="body">Body</label>
    <textarea id="body" cols="30" rows="10" onChange={(e) => setBody(e.target.value)}></textarea>
    <button disabled={ !author.trim() || !category.trim()|| !title.trim() || !body.trim() } onClick={addPost()}>
      add comment
    </button>
  </Section>
)

function mapStateToProps (state, { type = 'all' }) {
  return {
    categories: state.categories.map((c) => c.name),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: ({ author, body, title, category }) => dispatch(addPostAction({ author, body, title, category })),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withState('author', 'setAuthor', ''),
  withState('title', 'setTitle', ''),
  withState('body', 'setBody', ''),
  withState('category', 'setCategory', ''),
  withHandlers({
    addPost: ({ author, body, title, category, setCategory, setTitle, setAuthor, setBody, addPost }) => () => event => {
      setBody('')
      setTitle('')
      setCategory('')
      setAuthor('')
      addPost({ author, body, title, category })
    }
  })
)(Form)
