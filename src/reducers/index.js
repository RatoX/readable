import { combineReducers } from 'redux'

const initialState = {
  [-1]: {
    title: 'Teste',
  },
  [-2]: {
    title: 'Rodrigo',
  }
}

function posts (state = initialState, action) {
  switch (action.type) {
    case 'ADD_POST' :
      const { post } = action

      return {
        ...state,
        [post.id]: post
      }
    default :
      return state
  }
}

export default combineReducers({
  posts,
})
