import React from 'react';
import { View, StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';

const EditPostScreen = () => {
  return (
    <View style={styles.container}>
      <PostForm />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default EditPostScreen
