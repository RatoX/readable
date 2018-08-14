import { UPDATE_POST, ADD_POSTS } from '../types'

const receivePost = (post) => ({ type: UPDATE_POST, post })
const receivePostComments = (id, comments) => ({ type: UPDATE_POST, post: { id, comments } })
const receivePosts = (data) => {
  const posts = data.reduce((acc, cur) => {
    acc[cur.id] = { ...cur }
    return acc
  }, {})

  return {
    type: ADD_POSTS,
    posts,
  }
}

export function loadPost(id) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/posts/${id}`, { headers: { 'Authorization': 'whw' } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePost(d)))
  };
}

export function loadComments(id) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/posts/${id}/comments`, { headers: { 'Authorization': 'whw' } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePostComments(id, d)))
  };
}

export function loadPostsFromCategory(type = 'all') {
  const path = type === 'all' ? '/posts' : `/${type}/posts`

  return function(dispatch) {
    return fetch(`http://localhost:3001${path}`, { headers: { 'Authorization': 'whw' } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePosts(d)))
  };
}

const votePost = (id, option) => {
  const body = JSON.stringify({ option })
  const headers = {
    'Authorization': 'whw',
    'Content-Type': 'application/json'
  }

  return function(dispatch) {
    return fetch(`http://localhost:3001/posts/${id}`, { body, method: 'POST', headers })
      .then((s) => s.json())
      .then((d) => dispatch(receivePost(d)))
  };
}

export function upVotePost(id) {
  return votePost(id, 'upVote')
}

export function downVotePost(id) {
  return votePost(id, 'downVote')
}


export function deletePost(id) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/posts/${id}`, { method: 'DELETE', headers: { 'Authorization': 'whw' } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePost(d)))
  };
}
