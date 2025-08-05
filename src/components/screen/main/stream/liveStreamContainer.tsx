import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {StreamView} from './streamView';
import {useMeeting} from '@videosdk.live/react-native-sdk';

export const LiveStreamContainer = ({userData, navigation}: any) => {
  const [joined, setJoined] = useState(false);

  const {join} = useMeeting({
    onMeetingJoined: () => {
      setJoined(true);
    },
    onMeetingLeft: () => {
      navigation.goBack();
    },
    onError: error => {
      Alert.alert('Error', error.message);
      navigation.goBack();
    },
  });

  return (
    <View style={styles.container}>
      <StreamView
        userName={userData.fullName}
        joined={joined}
        navigation={navigation} />
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
