import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import AuthForm from '../components/AuthForm';
import AuthContext from '../context/auth/authContext';

const LoginScreen = ({ navigation }) => {

  const { login, errors, clearErr } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
    isValidPassword: true,
    isValidEmail: true,
    emptyFields: false
  });

  const emailInputChange = (val) => {
    const isEmail = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    if (!val.match(isEmail)) {
      setUser({
        ...user,
        email: val,
        isValidEmail: false
      })

    } else {
      setUser({
        ...user,
        email: val,
        isValidEmail: true
      })
    }
  }

  const passwordInputChange = (val) => {
    if (val.length < 6) {
      setUser({
        ...user,
        password: val,
        isValidPassword: false
      })

    } else {
      setUser({
        ...user,
        password: val,
        isValidPassword: true
      })
    }
  }

  const onSubmit = () => {
    if (!user.email || !user.password) {
      setUser({
        ...user,
        emptyFields: true
      })
    } else if (!user.isValidEmail || !user.isValidPassword) {
      console.log('Incorrect Data')

    } else {
      setUser({
        isValidPassword: true,
        isValidEmail: true,
        emptyFields: false
      })

      // console.log({ email: user.email, password: user.password })
      login({ email: user.email, password: user.password })
    }
  }


  return (
    <View style={styles.container}>
      <AuthForm
        user={user}
        emailInputChange={emailInputChange}
        passwordInputChange={passwordInputChange}
        onSubmit={onSubmit}
        errors={errors}
      />
      <Button title="Don't have an accont? Sign Up here" type="clear" onPress={() => {
        navigation.navigate('SignUp');
        setUser({ ...user, emptyFields: false })
        clearErr();
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});

export default LoginScreen
