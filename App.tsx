import React from 'react';
import { Navigation } from './src/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux';
import { InternetStatus } from './src/modal';
import { fcmToken } from './src/helper';

import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {

  const aaaa = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      fcmToken(); // now it's safe to fetch the token
    }
  }

  aaaa()

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <InternetStatus />
        <Navigation />
      </Provider>
    </PersistGate>
  );
}

export default App;
