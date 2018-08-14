import { combineReducers } from 'redux'

const initialState = {
  ['8xf0y6ziyjabvozdd253nd']: {
  },
  ['6ni6ok3ym7mf1p33lnez']: {
  }
}

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
  console.log('POSTS TYPE', action.type)
  const { post } = action

  switch (action.type) {
    case 'UPDATE_POST' :
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          ...post
        }
      }
    case 'ADD_POST' :
      return {
        ...state,
        [post.id]: post
      }
    default :
      return state
  }
}

function categories (state = initialStateCategories, action) {
  console.log('CATEGORIES TYPE', action.type)

  switch (action.type) {
    default :
      return state
  }
}

export default combineReducers({
  posts,
  categories,
})
