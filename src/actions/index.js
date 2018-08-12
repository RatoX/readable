import { UPDATE_POST } from '../types'
const receivePost = (post) => ({ type: UPDATE_POST })

export function loadPost(id) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/posts/${id}`, { headers: { 'Authorization': 'whw' } })
      .then((s) => s.json())
      .then((d) => dispatch(receivePost(...d)))
  };
}
