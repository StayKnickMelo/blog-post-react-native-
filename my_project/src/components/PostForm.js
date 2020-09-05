import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import PostContext from '../context/posts/postsContext';

const PostForm = () => {

  const { addPost, currentPost, clearCurrent, updatePost } = useContext(PostContext);

  useEffect(() => {
    if (currentPost) {
      setPost({
        ...post,
        title: currentPost.title,
        text: currentPost.text,
      });
    }
  }, []);


  const [post, setPost] = useState({
    title: '',
    text: '',
    isValidTitle: true,
    isValidText: true
  });

  const onInputTitleChange = (val) => {
    setPost({ ...post, title: val });
  };

  const onInputTextChange = (val) => {
    setPost({ ...post, text: val });
  };

  const submit = () => {
    if (!post.text && !post.title) {
      setPost({
        ...post,
        isValidText: false,
        isValidTitle: false
      });

    } else if (!post.text) {
      setPost({
        ...post,
        isValidText: false
      })

    } else if (!post.title) {
      setPost({
        ...post,
        isValidTitle: false
      })

    } else {

      if (currentPost) {
        updatePost({ title: post.title, text: post.text }, currentPost._id);

      } else {
        addPost({
          title: post.title,
          text: post.text
        });
      }

      setPost({
        title: '',
        text: '',
        isValidTitle: true,
        isValidText: true
      });


    }
  }




  return (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{currentPost !== null ? "Edit Post" : "Add Post"}</Text>
      <Input
        placeholder="Title"
        value={post.title}
        onChangeText={onInputTitleChange}
        errorMessage={post.isValidTitle ? null : 'Add a title'} />

      <Input
        placeholder="Post"
        value={post.text}
        onChangeText={onInputTextChange}
        errorMessage={post.isValidText ? null : 'Add some text'} />

      <Button title={currentPost !== null ? "Update" : "Submit"} onPress={submit} />
      {currentPost !== null && (
        <Button title="Canel" buttonStyle={{ backgroundColor: '#b30c12', marginTop: 5 }} onPress={clearCurrent} />
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  postContainer: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: 'gray'
  }
});

export default PostForm

