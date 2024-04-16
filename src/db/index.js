import AsyncStorage from '@react-native-async-storage/async-storage';


const getSession = async (callback) => {
  try {
    const sessionData = await AsyncStorage.getItem('sessionData');
    const session = JSON.parse(sessionData);
    callback(session);
  } catch (error) {
    console.log('Error getting session:', error);
  }
};

const insertSession = async (email, idToken, localId) => {
  try {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const session = {
      email: email,
      idToken: idToken,
      localId: localId,
      updatedAt: currentTimeInSeconds,
    };
    await AsyncStorage.setItem('sessionData', JSON.stringify(session));
    console.log('Session inserted successfully');
  } catch (error) {
    console.log('Error inserting session:', error);
  }
};

const deleteSession = async () => {
  try {
    await AsyncStorage.removeItem('sessionData');
    console.log('Session deleted successfully');
  } catch (error) {
    console.log('Error deleting session:', error);
  }
};

export {  getSession, insertSession, deleteSession };
