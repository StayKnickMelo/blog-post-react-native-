import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import AuthForm from '../components/AuthForm'
import AuthContext from '../context/auth/authContext';

const SignUpScreen = ({ navigation }) => {

  const { errors, clearErr } = useContext(AuthContext);

  useEffect(() => {
    localSignIn()
  }, []);

  const { register, localSignIn, } = useContext(AuthContext);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isValidName: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    emptyFields: false

  });

  const nameInputChange = (val) => {
    if (val.length > 0) {
      setUser({
        ...user,
        name: val,
        isValidName: true
      })
    } else {
      setUser({
        ...user,
        name: val,
        isValidName: false
      })
    }
  }

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

  const confirmPasswordInputChange = (val) => {
    if (val !== user.password) {
      setUser({
        ...user,
        confirmPassword: val,
        isValidConfirmPassword: false
      })

    } else {
      setUser({
        ...user,
        confirmPassword: val,
        isValidConfirmPassword: true
      })

    }

  }

  const onSubmit = () => {
    if (!user.name || !user.email || !user.password || !user.confirmPassword) {
      setUser({
        ...user,
        emptyFields: true
      })

    } else if (!user.isValidEmail || !user.isValidName || !user.isValidPassword || !user.isValidConfirmPassword) {
      console.log('Incorrect Data')
    } else {
      setUser({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isValidName: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        emptyFields: false
      });

      register({ name: user.name, email: user.email, password: user.password })
    }

  }

  return (
    <View style={styles.container}>
      <AuthForm
        user={user}
        nameInputChange={nameInputChange}
        emailInputChange={emailInputChange}
        passwordInputChange={passwordInputChange}
        confirmPasswordInputChange={confirmPasswordInputChange}
        onSubmit={onSubmit}
        errors={errors}

      />
      <Button title="Already have an accont? Sign In here" type="clear" onPress={() => {
        navigation.navigate('LogIn');
        setUser({ ...user, emptyFields: false })
        clearErr()
      }} />
    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});

export default SignUpScreen