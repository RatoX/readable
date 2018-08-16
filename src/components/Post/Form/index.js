import React from 'react'
import Section from '../../styles/Section'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose, lifecycle, withState, withProps, withHandlers, withStateHandlers } from 'recompose'
import { editPost as editPostAction, addPost as addPostAction, loadPost as loadPostAction  } from '../../../store/actions'

const SectionInline = Section.extend`
  flex-direction: row;
  justify-content: center;
`

const Form = ({ id, author, title, body, categories, category, showActionButton, setCategory, setAuthor, setTitle, setBody, addPost, editPost }) => (
  <Section>
    <SectionInline>
      <label htmlFor="title">Title: </label>
      <input id="title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
    </SectionInline>
    <SectionInline>
      <label htmlFor="author">Author: </label>
      <input id="author" type="text" onChange={(e) => setAuthor(e.target.value)} value={author} />
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
    <textarea id="body" cols="30" rows="10" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
    { !id && (
      <button disabled={ !showActionButton } onClick={addPost()}>
        create new post
      </button>
    )}
    { id && (
      <button disabled={ !showActionButton } onClick={editPost(id)}>
        edit post
      </button>
    )}
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
    editPost: ({ id, author, body, title, category }) => dispatch(editPostAction({ id, author, body, title, category })),
    loadPost: (id) => dispatch(loadPostAction(id)),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withState('author', 'setAuthor', ''),
  withState('title', 'setTitle', ''),
  withState('body', 'setBody', ''),
  withState('category', 'setCategory', ''),
  lifecycle({
    componentDidMount() {
      const { id, loadPost, setAuthor, setTitle, setCategory, setBody } = this.props

      if (id) {
        loadPost(id)
          .then(({ post }) => {
            const { author, title, body, category } = post

            setAuthor(author)
            setTitle(title)
            setBody(body)
            setCategory(category)
          })
      }
    }
  }),
  withProps((props) => {
    const { author, title, body, category, history } = props

    return {
      showActionButton: author.trim() && category.trim() && title.trim() && body.trim(),
      backToHome: () => history.push('/'),
    }
  }),
  withStateHandlers({}, {
    cleanData: ({ title, body, author, category}) => () => ({
      title: '',
      author: '',
      category: '',
      body: '',
    }),
  }),
  withHandlers({
    addPost: ({ author, body, title, category, cleanData, addPost }) => () => event => {
      addPost({ author, body, title, category })
      cleanData()
    },

    editPost: ({ author, body, title, category, cleanData, editPost, backToHome }) => (id) => event => {
      editPost({ id, author, body, title, category })
      cleanData()
      backToHome()
    },
  })
)(Form)
