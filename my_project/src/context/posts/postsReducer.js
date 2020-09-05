import { LOAD_POSTS, ADD_REMOVE_LIKE, ADD_POST, POST_ERROR, DELETE_POST, SET_CURRENT, CLEAR_CURRENT, UPDATE_POST } from "../types";

const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload)

      };
    case POST_ERROR:
      return {
        ...state,
        error: payload
      }
    case SET_CURRENT:
      return {
        ...state,
        currentPost: payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        currentPost: null
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload._id ? payload : post)
      }
    case ADD_REMOVE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post)
      }
    default:
      return state
  }
};


export default postReducer;