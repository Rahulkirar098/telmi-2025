import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


export const fcmToken = async () => {
    try {
        //   let fcmToken = await AsyncStorage.getItem('fcmToken');
        //   console.log('Old FCM Token:', fcmToken);

        //   if (!fcmToken) {
        let fcmToken = await messaging().getToken();
        console.log('New FCM Token:', fcmToken);
        //     await AsyncStorage.setItem('fcmToken', fcmToken);
        //   }
    } catch (error) {
        console.log('Error retrieving or storing FCM Token:', error);
    }
};