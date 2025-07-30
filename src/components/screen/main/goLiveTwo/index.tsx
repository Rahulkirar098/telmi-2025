import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
  register,
  RTCView,
} from '@videosdk.live/react-native-sdk';
import FastImage from 'react-native-fast-image';
import {png} from '../../../../assets/png';
import {horizontalScale} from '../../../../utils';
import { Controls } from '../stream/Controls';

register();

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkMjFkOGVjYy01YmJjLTRiZGUtYmE5OC0wZWU5MzIwMTYyMzkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0NzE2MzQ1MCwiZXhwIjoxOTA0OTUxNDUwfQ.9M80GqcUoRWPSCgbjItJ578Gb4zz4ZVVTPfHd1Ydymo';

const createStream = async (token: any) => {
  const res = await fetch('https://api.videosdk.live/v2/rooms', {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  //Destructuring the streamId from the response
  const {roomId: streamId} = await res.json();
  return streamId;
};

function JoinView({initializeStream, setMode}: any) {
  const [streamId, setStreamId] = useState('');

  const handleAction = async (mode: any) => {
    // Sets the mode (Host or Audience) and initializes the stream
    setMode(mode);
    await initializeStream(streamId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAction(Constants.modes.SEND_AND_RECV)}>
        <Text style={styles.buttonText}>Create Live Stream as Host</Text>
      </TouchableOpacity>
      <Text style={styles.separatorText}>---------- OR ----------</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Stream Id"
        onChangeText={setStreamId}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAction(Constants.modes.SEND_AND_RECV)}>
        <Text style={styles.buttonText}>Join as Host</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAction(Constants.modes.RECV_ONLY)}>
        <Text style={styles.buttonText}>Join as Audience</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Component to manage live stream container and session joining
function LSContainer({streamId, onLeave}: any) {
  const [joined, setJoined] = useState(false); // Track if the user has joined the stream

  const {join} = useMeeting({
    onMeetingJoined: () => setJoined(true), // Set `joined` to true when successfully joined
    onMeetingLeft: onLeave, // Handle the leave stream event
    onError: error => Alert.alert('Error', error.message), // Display an alert on encountering an error
  });

  console.log(streamId, '===@@@');

  return (
    <SafeAreaView style={styles.container}>
      {joined ? (
        <StreamView />
      ) : (
        <TouchableOpacity style={styles.button} onPress={join}>
          <Text style={styles.buttonText}>Join Stream</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// Component to display the live stream view
function StreamView() {
  const {participants} = useMeeting(); // Access participants using the VideoSDK useMeeting hook
  const participantsArrId = Array.from(participants.entries())
    .filter(
      ([_, participant]) => participant.mode === Constants.modes.SEND_AND_RECV,
    )
    .map(([key]) => key);

  return (
    <View style={{flex: 1}}>
      <Controls />
      <FlatList
        data={participantsArrId}
        renderItem={({item}) => {
          return (
            <View style={{flex: 1, height: Dimensions.get('window').height}}>
              <Participant participantId={item} />
            </View>
          );
        }}
        style={{
          borderWidth: 2,
          borderColor: 'green',
        }}
      />
    </View>
  );
}

function Participant({participantId}: any) {
  const {webcamStream, webcamOn} = useParticipant(participantId);

  return webcamOn && webcamStream ? (
    <RTCView
      //@ts-ignore
      streamURL={new MediaStream([webcamStream?.track]).toURL()}
      objectFit={'cover'}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    />
  ) : (
    <View style={styles.noMedia}>
      <Text style={styles.noMediaText}>NO MEDIA</Text>
    </View>
  );
}

// Component for managing stream controls


export const GoLiveTwo = () => {
  const [streamId, setStreamId] = useState(null); // Holds the current stream ID
  const [mode, setMode] = useState(Constants.modes.SEND_AND_RECV); // Holds the current user mode (Host or Audience)

  const initializeStream = async (id: any) => {
    // Creates a new stream if no ID is provided or uses the given stream ID
    const newStreamId = id || (await createStream(token));
    setStreamId(newStreamId);
  };

  const onStreamLeave = () => setStreamId(null); // Resets the stream state on leave

  return token && streamId ? (
    <MeetingProvider
      config={{
        meetingId: streamId,
        micEnabled: true, // Enables microphone by default
        webcamEnabled: true, // Enables webcam by default
        name: 'John Doe', // Default participant name
        mode: mode as any,
      }}
      token={token}>
      {/* Renders the live stream container if a stream is active */}
      <LSContainer streamId={streamId} onLeave={onStreamLeave} />
    </MeetingProvider>
  ) : (
    // Renders the join view if no stream is active
    <JoinView initializeStream={initializeStream} setMode={setMode} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FF',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue',
  },
  button: {
    backgroundColor: '#1178F8',
    padding: 12,
    marginTop: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    fontStyle: 'italic',
    marginVertical: 10,
  },
  controls: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 9999999,
    borderWidth: 5,
    borderColor: 'yellow',
  },
  noMedia: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMediaText: {
    fontSize: 16,
  },
  separatorText: {
    alignSelf: 'center',
    fontSize: 22,
    marginVertical: 16,
    fontStyle: 'italic',
    color: 'grey',
  },
});
