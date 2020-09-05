import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'
import AuthContext from '../context/auth/authContext';
import PostContext from '../context/posts/postsContext';

const PostItem = ({ post, navigation }) => {

  const { user } = useContext(AuthContext);
  const { likePost, deletePost, setToEdit } = useContext(PostContext);


  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.topContainer}>
          <View style={styles.userLogo}>
            <FontAwesome name="user-circle" size={27} color="gray" />
            <Text style={styles.name}>{post.userName}</Text>
          </View>
          {user !== null && user._id === post.user && (
            <TouchableOpacity onPress={() => deletePost(post._id)}>
              <View style={styles.removeBtn}>
                <FontAwesome name="remove" size={25} color="red" />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Card.Divider />
        <Text style={styles.text}>{post.text}</Text>
        <Card.Divider />
        <View style={styles.bottomCnt}>
          <View style={styles.likeContainer}>
            <TouchableOpacity onPress={() => likePost(post._id)}>
              <FontAwesome name="heart" size={26} color="red" />
            </TouchableOpacity>
            {post.likes.length > 0 && (
              <View>
                <Text style={styles.like}>Likes: {post.likes.length} </Text>
              </View>
            )}
          </View>
          {user !== null && user._id === post.user && (
            <Button style={styles.btn} title="Edit" onPress={() => {setToEdit(post)}} />
          )}
        </View>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'

  },
  userLogo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    marginLeft: 10,
    fontSize: 17

  },
  removeBtn: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 15
  },
  likeContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomCnt: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  like: {
    marginLeft: 10,
    fontSize: 18,
    color: 'gray'
  },
  btn: {
    width: 100

  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 5
  }
  // badge: {
  //   marginLeft: 10,
  //   backgroundColor: 'lightgray',
  //   width: 25,
  //   height: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderRadius: 100,
  //   borderColor: 'lightgray'

  // }

});

export default PostItem
