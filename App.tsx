import React from 'react';
import {Navigation} from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux';
import {InternetStatus} from './src/modal';
import { fcmToken } from './src/helper';

function App(): React.JSX.Element {
  fcmToken()
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
