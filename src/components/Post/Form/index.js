import React from 'react'
import PropTypes from 'prop-types'
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
      <label htmlFor='title'>Title: </label>
      <input id='title' type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
    </SectionInline>
    <SectionInline>
      <label htmlFor='author'>Author: </label>
      <input id='author' type='text' onChange={(e) => setAuthor(e.target.value)} value={author} />
    </SectionInline>
    <SectionInline>
      <label htmlFor='category'>Category: </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>----- select -----</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>
    </SectionInline>

    <label htmlFor='body'>Body</label>
    <textarea id='body' cols='30' rows='10' onChange={(e) => setBody(e.target.value)} value={body} />
    { !id && (
      <button disabled={!showActionButton} onClick={addPost()}>
        create new post
      </button>
    )}
    { id && (
      <button disabled={!showActionButton} onClick={editPost(id)}>
        edit post
      </button>
    )}
  </Section>
)


Form.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  categories: PropTypes.array,
  category: PropTypes.string,
  showActionButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  setCategory: PropTypes.func,
  setAuthor: PropTypes.func,
  setTitle: PropTypes.func,
  setBody: PropTypes.func,
  addPost: PropTypes.func,
  editPost: PropTypes.func,
}

Form.defaultProps = {
  showActionButton: false,
}

function mapStateToProps (state) {
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
  withProps((props) => {
    const { author, title, body, category, history } = props

    return {
      showActionButton: author.trim() && category.trim() && title.trim() && body.trim(),
      backToHome: () => history.push('/'),
    }
  }),
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
  withStateHandlers({}, {
    cleanData: () => () => ({
      title: '',
      author: '',
      category: '',
      body: '',
    }),
  }),
  withHandlers({
    addPost: ({ author, body, title, category, cleanData, addPost }) => () => () => {
      addPost({ author, body, title, category })
      cleanData()
    },

    editPost: ({ author, body, title, category, cleanData, editPost, backToHome }) => (id) => () => {
      editPost({ id, author, body, title, category })
      cleanData()
      backToHome()
    },
  })
)(Form)
