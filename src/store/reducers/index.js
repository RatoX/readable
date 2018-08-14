import { combineReducers } from 'redux'

const initialState = { }

const initialStateCategories = [
  {
    'name': 'react',
    'path': 'react'
  },
  {
    'name': 'redux',
    'path': 'redux'
  },
  {
    'name': 'udacity',
    'path': 'udacity'
  }
]

function posts (state = initialState, action) {
  const { post, posts } = action

  switch (action.type) {
    case 'UPDATE_POST' :
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          ...post
        }
      }
    case 'ADD_POSTS' :
      return {
        ...state,
        ...posts
      }
    default :
      return state
  }
}

function categories (state = initialStateCategories, action) {
  switch (action.type) {
    default :
      return state
  }
}

export default combineReducers({
  posts,
  categories,
})
