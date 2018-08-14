import { UPDATE_POST, UPDATE_POST_COMMENT, ADD_POSTS } from '../types'

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {/* eslint-ignore */
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

const TOKEN = 'dsdd'
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
    return fetch(`http://localhost:3001/posts/${id}`, { headers: { 'Authorization': TOKEN } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePost(d)))
  };
}

export function loadComments(id) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/posts/${id}/comments`, { headers: { 'Authorization': TOKEN } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePostComments(id, d)))
  };
}

export function loadPostsFromCategory(type = 'all') {
  const path = type === 'all' ? '/posts' : `/${type}/posts`

  return function(dispatch) {
    return fetch(`http://localhost:3001${path}`, { headers: { 'Authorization': TOKEN } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePosts(d)))
  };
}

const vote = (id, option, type, cb) => {
  const body = JSON.stringify({ option })
  const headers = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json'
  }

  return function(dispatch) {
    return fetch(`http://localhost:3001/${type}/${id}`, { body, method: 'POST', headers })
      .then((s) => s.json())
      .then(cb(dispatch))
  };
}

const votePost = (id, option) => {
  return vote(id, option, 'posts', (dispatch) => (d) => dispatch(receivePost(d)))
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
    return fetch(`http://localhost:3001/posts/${id}`, { method: 'DELETE', headers: { 'Authorization': TOKEN } })
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
    return fetch(`http://localhost:3001/comments/${id}`, { method: 'DELETE', headers: { 'Authorization': TOKEN } })
      .then((s) => s.json())
      .then((d) => dispatch(receiveComment(d)))
  };
}

export function addComment(postId, { author, body }) {
  const comment = {
    id: uuidv4(),
    timestamp: (new Date()).getTime(),
    parentId: postId,
    voteScore: 1,
    body,
    author,
  }
  const bodyHttp = JSON.stringify(comment)

  return function(dispatch) {
    return fetch(`http://localhost:3001/comments`, { body: bodyHttp, method: 'POST', headers: { 'Authorization': TOKEN } })
      .then((s) => s.json())
      .then((d) => dispatch(receiveComment({ ...comment, ...d })))
  };
}
