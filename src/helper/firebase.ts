import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fcmToken = async () => {
    try {
        // Required for iOS: register for remote messages before getting token
        await messaging().registerDeviceForRemoteMessages();

        // Get the FCM token
        let fcmToken = await messaging().getToken();
        console.log('New FCM Token:', fcmToken);

        // Optionally store the token locally
        await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (error) {
        console.log('Error retrieving or storing FCM Token:', error);
    }
};


