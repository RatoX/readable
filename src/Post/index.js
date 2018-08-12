import React from 'react'
import { connect } from 'react-redux';
import { compose, withPropsOnChange, lifecycle, withProps, withHandlers, defaultProps, withState } from 'recompose';
import { loadPost as loadPostAction } from '../actions'

const Post = ({ id, rod }) => (
  <span>{ id }, =====D, { rod }</span>
)

function mapDispatchToProps (dispatch) {
  return {
    loadPost: (id) => dispatch(loadPostAction(id)),
  }
}

function mapStateToProps (state, props) {
  return {
    id: props.id,
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { id, loadPost } = this.props
      loadPost(id)
        .then(() => {

        })
    }
  }),
)(Post)
