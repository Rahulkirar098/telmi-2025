import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {token} from '../../../../api/env';

// Video SDK Constants
import {MeetingProvider, Constants} from '@videosdk.live/react-native-sdk';
import {
  useMeeting,
  useParticipant,
  RTCView,
} from '@videosdk.live/react-native-sdk';
import {Alert} from 'react-native';

import {platform} from '../../../../utils';

// Component to manage live stream container and session joining
function LSContainer({onLeave}: any) {
  const [joined, setJoined] = useState(false); // Track if the user has joined the stream

  const {join} = useMeeting({
    onMeetingJoined: () => setJoined(true), // Set `joined` to true when successfully joined
    onMeetingLeft: onLeave, // Handle the leave stream event
    onError: error => Alert.alert('Error', error.message), // Display an alert on encountering an error
  });


  const {participants} = useMeeting(); // Access participants using the VideoSDK useMeeting hook
  const participantsArrId = Array.from(participants.entries())
    .filter(
      ([_, participant]) => participant.mode === Constants.modes.SEND_AND_RECV,
    )
    .map(([key]) => key);

  console.log(participantsArrId, '===@@@');

  const {webcamStream, webcamOn} = useParticipant(participantsArrId[0]);

  console.log(webcamStream, webcamOn, 'webcamOn ===@@@');

  return (
    <View style={styles.container}>
      {joined ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            height: '100%',
            backgroundColor: 'red',
          }}>
          <Text>Stream</Text>
          <View
            style={{
              width: 200,
              height: 200,
              borderWidth: 1,
              borderColor: 'black',
            }}>
            {webcamOn && webcamStream && (
              <RTCView
                //@ts-ignore
                streamURL={new MediaStream([webcamStream?.track]).toURL()}
                objectFit={'cover'}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          </View>
        </View>
      ) : (
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            height: '100%',
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={join}>
            <Text>Join Stream</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export const Stream = ({onLeave}: any) => {
  const [streamId, setStreamId] = useState('1t1t-am2d-an2m'); // Holds the current stream ID
  const [mode, setMode] = useState(Constants.modes.SEND_AND_RECV); // Holds the current user mode (Host or Audience)

  const onStreamLeave = () => setStreamId(''); // Resets the stream state on leave

  return (
    <View style={styles.container}>
      <MeetingProvider
        config={{
          meetingId: streamId,
          micEnabled: true,
          webcamEnabled: true,
          name: 'John Doe',
          mode: mode as any,
          maxResolution: 'hd',
        }}
        token={token}>
        <LSContainer onLeave={onStreamLeave} />
      </MeetingProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
