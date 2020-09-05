import React, { useReducer } from 'react';
import PostContext from './postsContext';
import postReducer from './postsReducer';
import api from '../../api/api';
import { LOAD_POSTS, ADD_REMOVE_LIKE, ADD_POST, POST_ERROR, DELETE_POST, SET_CURRENT, CLEAR_ERROR, CLEAR_CURRENT, UPDATE_POST } from '../types';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../../utils/navigationRef';

const PostsState = ({ children }) => {

  const initialState = {
    posts: [],
    currentPost: null,
    error: null
  }

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Load all posts
  const loadPosts = async () => {
    try {
      const res = await api.get('/posts');

      dispatch({
        type: LOAD_POSTS,
        payload: res.data.data
      });

    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  // Like a post
  const likePost = async (postId) => {

    const token = await AsyncStorage.getItem('token');

    try {
      const res = await api.put(`/posts/${postId}/like`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch({
        type: ADD_REMOVE_LIKE,
        payload: { postId, likes: res.data.data }
      });

    } catch (error) {
      console.log(error.response.data)

    }

  };

  // Add Post
  const addPost = async (post) => {

    const token = await AsyncStorage.getItem('token');

    try {

      const res = await api.post('/posts', post, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch({
        type: ADD_POST,
        payload: res.data.data
      });

      navigate('Posts');



    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: POST_ERROR,
        payload: error.response.data.error
      })

    }

  };

  // Delete Post
  const deletePost = async (postId) => {

    const token = await AsyncStorage.getItem('token');

    try {
      const res = await api.delete(`/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch({
        type: DELETE_POST,
        payload: postId
      });

    } catch (error) {
      console.log(error.response.data.error)
      dispatch({
        type: POST_ERROR,
        payload: error.response.data.error
      })

    }
  };

  // Set post to edit
  const setToEdit = (post) => {
    dispatch({
      type: SET_CURRENT,
      payload: post
    });

    navigate('EditScreen');
  };

  // Clear currentPost
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });

    navigate('Posts')
  };

  // Update a post
  const updatePost = async (updatedPost, postId) => {

    const token = await AsyncStorage.getItem('token');

    try {

      const res = await api.put(`/posts/${postId}`, updatedPost, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch({
        type: UPDATE_POST,
        payload: res.data.data
      });

      clearCurrent();

      navigate('Posts')

    } catch (error) {

      dispatch({
        type: POST_ERROR,
        payload: error.response.data.error
      })

    }

  }




  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        currentPost: state.currentPost,
        error: state.error,
        loadPosts,
        likePost,
        addPost,
        deletePost,
        setToEdit,
        clearCurrent,
        updatePost
      }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostsState
