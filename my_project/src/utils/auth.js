import axios from '../api/api';
import AsyncStorage from '@react-native-community/async-storage';

const setAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(`from setAuthToken ${token}`)

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  } catch (error) {
    console.log(error)
  }
};

export default setAuthToken;