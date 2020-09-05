import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Screens
import LogInScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AccountScreen from './src/screens/AccountScreen';
import PostsScreen from './src/screens/PostsScreen';
import AddPostScreen from './src/screens/AddPostScreen';
import EditPostScreen from './src/screens/EditPostScreen';

// Context API
import AuthState from './src/context/auth/AuthState';
import PostsState from './src/context/posts/PostsState';

// Utils
import { setNavigator } from './src/utils/navigationRef';
import setAuthToken from './src/utils/auth';

setAuthToken();

const swithNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignUp: SignUpScreen,
    LogIn: LogInScreen
  }),
  mainFlow: createBottomTabNavigator({
    Posts: PostsScreen,
    AddPost: AddPostScreen,
    Account: AccountScreen
  }),
  EditScreen: EditPostScreen
});

const App = createAppContainer(swithNavigator);

export default () => {
  return (
    <AuthState>
      <PostsState>
        <App ref={(navigator) => setNavigator(navigator)} />
      </PostsState>
    </AuthState>
  )
}