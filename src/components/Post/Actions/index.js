import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers, withProps } from 'recompose'
import { Link, withRouter } from 'react-router-dom'
import { deletePost as deletePostAction } from '../../../store/actions'
import TextAction from '../../styles/TextAction'

const Actions = ({ id, deletePost, category }) => (
  <React.Fragment>
    <TextAction>
      <Link to={`/${category}/${id}/edit`}>
        edit
      </Link>
    </TextAction>
    <TextAction onClick={deletePost(id)}>
      delete
    </TextAction>
  </React.Fragment>
)


Actions.propTypes = {
  id: PropTypes.string,
  deletePost: PropTypes.func,
  category: PropTypes.string,
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (id) => dispatch(deletePostAction(id)),
  }
}

export default compose(
  withRouter,
  connect(props => props, mapDispatchToProps),
  withProps((props) => ({
    backToHome: () => props.history.push('/'),
  })),
  withHandlers({
    deletePost: ({ deletePost, backToHome }) => ( id ) => () => {
      deletePost(id)
      backToHome()
    }
  })
)(Actions)
