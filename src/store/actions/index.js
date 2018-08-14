import { UPDATE_POST, UPDATE_POST_COMMENT, ADD_POSTS } from '../types'

const receivePost = (post) => ({ type: UPDATE_POST, post })
const receiveComment = (comment) => ({ type: UPDATE_POST_COMMENT, comment })
const receivePostComments = (id, data) => {
  const comments = data.reduce((acc, cur) => {
    acc[cur.id] = { ...cur }
    return acc
  }, {})

  return {
    type: UPDATE_POST,
    post: {
      id,
      comments,
    }
  }
}
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

const vote = (id, option, type = 'posts', cb) => {
  const body = JSON.stringify({ option })
  const headers = {
    'Authorization': 'whw',
    'Content-Type': 'application/json'
  }

  return function(dispatch) {
    return fetch(`http://localhost:3001/${type}/${id}`, { body, method: 'POST', headers })
      .then((s) => s.json())
      .then(cb(dispatch))
  };
}

const votePost = (id, option) => {
  return vote(id, option, (dispatch) => (d) => dispatch(receivePost(d)))
}

const voteComment = (id, option) => {
  return vote(id, option, 'comments', (dispatch) => (d) => dispatch(receiveComment(d)))
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

export function upVoteComment(id) {
  return voteComment(id, 'upVote')
}

export function downVoteComment(id) {
  return voteComment(id, 'downVote')
}

export function deleteComment(id) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/comments/${id}`, { method: 'DELETE', headers: { 'Authorization': 'whw' } })
      .then((s) => s.json())
  };
}
