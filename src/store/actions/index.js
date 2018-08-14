import { UPDATE_POST } from '../types'
const receivePost = (post) => ({ type: UPDATE_POST, post })
const receivePostComments = (id, comments) => ({ type: UPDATE_POST, post: { id, comments } })

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
