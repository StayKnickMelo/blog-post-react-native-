import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Header, Text } from 'react-native-elements';
import AuthContext from '../context/auth/authContext';
import { FontAwesome } from '@expo/vector-icons'

const AccountScreen = () => {

  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <Header centerComponent={{ text: 'My Account', style: { color: '#fff', fontSize: 30, marginBottom: 5 } }} />

      <View style={styles.container}>
        <FontAwesome name="user-circle" size={160} color="#2389DD" />
        <View style={styles.flexCont} >
          <View style={styles.badge}>
            <Text style={styles.text}>Name</Text>
          </View>
          <Text style={{ fontSize: 19 }} >{user !== null && user.name}</Text>
        </View>

        <View style={[styles.flexCont, styles.flexContWider]} >
          <View style={[styles.badge, styles.bageOrange]}>
            <Text style={styles.text}>Email</Text>
          </View>
          <Text style={{ fontSize: 19 }} >{user !== null && user.email}</Text>
        </View>
      </View>
      <Button style={styles.btn} title="Sign Out" onPress={signOut} />
    </>
  )
};

AccountScreen.navigationOptions = {
  tabBarIcon: <FontAwesome name="user-o" size={25} />

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 100,
  },
  text: {
    color: '#fff',
    fontSize: 19
  },

  badge: {
    backgroundColor: '#53C418',
    width: 70,
    height: 30,
    padding: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  bageOrange: {
    backgroundColor: '#FBAD15'

  },
  flexCont: {
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',
    width: 150,
    marginVertical: 5,
    paddingVertical: 2
  },
  flexContWider: {
    width: 300
  },
  btn: {
    marginHorizontal: 10,
    marginTop: 5
  }

});

export default AccountScreen