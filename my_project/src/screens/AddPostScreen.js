import React from 'react';
import { View, StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';
import { Entypo } from '@expo/vector-icons';

const AddPostScreen = () => {


  return (
    <View style={styles.container}>
      <PostForm />
    </View>
  )
};

AddPostScreen.navigationOptions = {
  title: 'Add Post',
  tabBarIcon: <Entypo name="new-message" size={25} />

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});




export default AddPostScreen