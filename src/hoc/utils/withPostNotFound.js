import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, branch, renderComponent } from 'recompose'
import TextAction from '../../components/styles/TextAction'

const NotFound = () => (
  <section>
    Post not found :/
    <br />
    <TextAction>
      <Link to='/'>
        Back to home page
      </Link>
    </TextAction>
  </section>
)

function mapStateToProps (state, props) {
  const { id } = props
  const post = state.posts[id] || {}

  return {
    deleted: post.deleted,
  }
}

export default compose(
  connect(mapStateToProps),
  branch(props => props.deleted, renderComponent( NotFound ))
)
