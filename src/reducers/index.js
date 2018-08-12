import { combineReducers } from 'redux'

const initialState = [
  {
    'author': 'thingtwo',
    'body': 'Everyone says so after all.',
    'category': 'react',
    'commentCount': 2,
    'deleted': false,
    'id': '8xf0y6ziyjabvozdd253nd',
    'timestamp': 1467166872634,
    'title': 'Udacity is the best place to learn React',
    'voteScore': 6
  },
  {
    'author': 'thingone',
    'body': 'Just kidding. It takes more than 10 minutes to learn technology.',
    'category': 'redux',
    'commentCount': 0,
    'deleted': false,
    'id': '6ni6ok3ym7mf1p33lnez',
    'timestamp': 1468479767190,
    'title': 'Learn Redux in 10 minutes!',
    'voteScore': -5
  }
]

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
