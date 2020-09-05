import React, { useEffect, useContext } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import PostItem from '../components/PostItem';
import PostsContext from '../context/posts/postsContext';
import { Entypo } from '@expo/vector-icons';

const PostsScreen = () => {

  const { posts, loadPosts } = useContext(PostsContext);

  useEffect(() => {
    loadPosts();
  }, []);

  if (posts.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <PostItem post={item} />
          )}
        />
      </View>
    )
  }


  return (
    <View style={styles.noPostsContainer}>
      <Text style={styles.text}>No One Has Posted So Far...</Text>
    </View>


  )
};

PostsScreen.navigationOptions = {
  tabBarIcon: <Entypo name="message" size={30} />

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
    flex: 1
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  text: {
    fontSize: 30,
    color: 'gray',
  }
});

export default PostsScreen
