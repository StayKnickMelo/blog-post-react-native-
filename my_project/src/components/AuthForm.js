import React from 'react';
import { Input, Button } from 'react-native-elements';
import { StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AuthForm = ({
  user,
  nameInputChange,
  emailInputChange,
  passwordInputChange,
  confirmPasswordInputChange,
  onSubmit,
  errors
}) => {


  return (
    <>
      {nameInputChange && (
        <Input
          value={user.name}
          onChangeText={nameInputChange}
          label="Enter Your Name"
          placeholder="Name"
          errorMessage={user.isValidName ? null : 'Name is required'}
          leftIcon={
            <Feather name="user" size={20} color="#b3babf" />
          } />
      )}

      <Input
        value={user.email}
        onChangeText={emailInputChange}
        label="Enter Your Email"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        errorMessage={user.isValidEmail ? null : 'Provide a valid email'}
        leftIcon={
          <Feather name="mail" size={20} color="#b3babf" />
        } />

      <Input
        value={user.password}
        onChangeText={passwordInputChange}
        label="Enter Password"
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        errorMessage={user.isValidPassword ? null : 'Password must be at least 6 chars long '}
        leftIcon={
          <Feather name="lock" size={20} color="#b3babf" />
        } />

      {confirmPasswordInputChange && (
        <Input
          value={user.confirmPassword}
          onChangeText={(val) => confirmPasswordInputChange(val)}
          label="Confirm Password"
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          errorMessage={user.isValidConfirmPassword ? null : 'Passwords do not match '}
          leftIcon={
            <Feather name="lock" size={20} color="#b3babf" />
          } />
      )}

      {user.emptyFields && <Text style={styles.customAlert}>Fill in all fields</Text>}
      {errors && <Text style={styles.customAlert}>{errors}</Text>}

      <Button style={styles.mx} title={confirmPasswordInputChange ? "Sign Up" : "Sign In"} onPress={onSubmit} />

    </>
  )
};

const styles = StyleSheet.create({
  mx: {
    marginHorizontal: 10
  },
  customAlert: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20

  }
});

export default AuthForm
