import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  PermissionsAndroid,
  Clipboard,
} from 'react-native';
import Video from 'react-native-video';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  RTCView,
  Constants,
  MediaStream,
} from '@videosdk.live/react-native-sdk';
import {token} from '../../../../api/env';
import {createStream} from '../../../../api/videoSdkApiCall';

async function requestCameraAndMicPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      return (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}

const Button = ({
  onPress,
  buttonText,
  backgroundColor = '#1178F8',
  btnStyle = {},
}:any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{...btnStyle, backgroundColor, padding: 10, borderRadius: 8}}>
    <Text style={{color: 'white', fontSize: 14}}>{buttonText}</Text>
  </TouchableOpacity>
);

function JoinScreen({getMeetingAndToken, setMode}:any) {
  const [meetingVal, setMeetingVal] = useState('');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        paddingHorizontal: 36,
      }}>
      <TextInput
        value={meetingVal}
        onChangeText={setMeetingVal}
        placeholder={'XXXX-XXXX-XXXX'}
        placeholderTextColor={'grey'}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 6,
          color: 'white',
          marginBottom: 16,
        }}
      />
      <Button
        onPress={async () => {
          const permitted = await requestCameraAndMicPermissions();
          if (!permitted) {
            Alert.alert(
              'Permissions Required',
              'Camera and Microphone permissions are required to join as Host.',
            );
            return;
          }
          setMode(Constants.modes.SEND_AND_RECV);
          getMeetingAndToken(meetingVal);
        }}
        buttonText="Join as Host"
      />
      <Button
        onPress={() => {
          setMode(Constants.modes.SIGNALLING_ONLY);
          getMeetingAndToken(meetingVal);
        }}
        buttonText="Join as Viewer"
      />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 22,
          marginVertical: 16,
          fontStyle: 'italic',
          color: 'grey',
        }}>
        ---------- OR ----------
      </Text>
      <Button
        onPress={async () => {
          const permitted = await requestCameraAndMicPermissions();
          if (!permitted) {
            Alert.alert(
              'Permissions Required',
              'Camera and Microphone permissions are required to create a room.',
            );
            return;
          }
          setMode(Constants.modes.SEND_AND_RECV);
          getMeetingAndToken();
        }}
        buttonText="Create Studio Room"
      />
    </SafeAreaView>
  );
}

function ParticipantView({participantId}: any) {
  const {webcamStream, webcamOn} = useParticipant(participantId);
  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream?.track]).toURL()}
      //   streamURL={webcamStream.toURL()}
      objectFit="cover"
      style={{height: 300, marginVertical: 8, marginHorizontal: 8}}
    />
  ) : (
    <View
      style={{
        backgroundColor: 'grey',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 8,
      }}>
      <Text style={{fontSize: 16}}>NO MEDIA</Text>
    </View>
  );
}

function Controls() {
  const {
    toggleWebcam,
    toggleMic,
    startHls,
    stopHls,
    hlsState,
    localParticipant,
  } = useMeeting({});

  const _handleHLS = async () => {
    if (!hlsState || hlsState === 'HLS_STOPPED') {
      // @ts-ignore
      startHls({
        layout: {type: 'SPOTLIGHT', priority: 'PIN', gridSize: 4},
        theme: 'DARK',
        orientation: 'portrait',
      });
    } else if (hlsState === 'HLS_STARTED' || hlsState === 'HLS_PLAYABLE') {
      stopHls();
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
      }}>
      <Button
        onPress={toggleWebcam}
        buttonText={
          localParticipant?.webcamOn ? 'Turn Off Camera' : 'Turn On Camera'
        }
        backgroundColor={localParticipant?.webcamOn ? '#f00' : '#0f0'}
      />
      <Button
        onPress={toggleMic}
        buttonText={localParticipant?.micOn ? 'Turn Off Mic' : 'Turn On Mic'}
        backgroundColor={localParticipant?.micOn ? '#f00' : '#0f0'}
      />
      <Button
        onPress={_handleHLS}
        buttonText={
          hlsState === 'HLS_STARTED' || hlsState === 'HLS_PLAYABLE'
            ? 'Stop HLS'
            : 'Start HLS'
        }
        backgroundColor="#1178F8"
      />
    </View>
  );
}

function HeaderView() {
  const {meetingId, leave} = useMeeting();
  console.log(meetingId);
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 24, color: 'white'}}>{meetingId}</Text>
      <Button
        btnStyle={{borderWidth: 1, borderColor: 'white'}}
        onPress={() => {
          Clipboard.setString(meetingId);
          Alert.alert('MeetingId copied successfully');
        }}
        buttonText="Copy MeetingId"
        backgroundColor="transparent"
      />
      <Button onPress={leave} buttonText="Leave" backgroundColor="#FF0000" />
    </View>
  );
}

function SpeakerView() {
  const {meetingId, participants} = useMeeting({});
  const speakers = useMemo(() => {
    return [...participants.values()].filter(
      p => p.mode === Constants.modes.SEND_AND_RECV,
    );
  }, [participants]);

  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <HeaderView />
      {speakers.length > 0 ? (
        <FlatList
          data={speakers}
          renderItem={({item}) => <ParticipantView participantId={item.id} />}
          keyExtractor={item => item.id}
        />
      ) : null}
      <Controls />
    </SafeAreaView>
  );
}

function ViewerView() {
  const {hlsState, hlsUrls} = useMeeting();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      {hlsState === 'HLS_PLAYABLE' ? (
        <>
          <HeaderView />
          <Video
            controls={true}
            source={{uri: hlsUrls.downstreamUrl}}
            resizeMode="stretch"
            style={{flex: 1, backgroundColor: 'black'}}
            onError={e => console.log('error', e)}
          />
        </>
      ) : (
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'white'}}>
            HLS is not started yet or is stopped
          </Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

function Container() {
  const {join, localParticipant} = useMeeting({
    onError: error => {
      console.log('Meeting error:', error.message, error);
      Alert.alert('Meeting Error', error.message || 'Unknown error');
    },
  });
  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      if (
        mMeetingRef.current.localParticipant.mode ===
        Constants.modes.SEND_AND_RECV
      ) {
        // @ts-ignore
        mMeetingRef.current.localParticipant.pin();
      }
    },
    onError: error => {
      console.log('Meeting error (mMeeting):', error.message, error);
      Alert.alert('Meeting Error (mMeeting)', error.message || 'Unknown error');
    },
  });
  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  return (
    <View style={{flex: 1}}>
      {localParticipant?.mode === Constants.modes.SEND_AND_RECV ? (
        <SpeakerView />
      ) : localParticipant?.mode === Constants.modes.SIGNALLING_ONLY ? (
        <ViewerView />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>
            Press Join button to enter studio.
          </Text>
          <Button
            btnStyle={{
              marginTop: 8,
              paddingHorizontal: 22,
              padding: 12,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 8,
            }}
            buttonText="Join"
            onPress={join}
          />
        </View>
      )}
    </View>
  );
}

export const StreamHls = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [mode, setMode] = useState(Constants.modes.CONFERENCE);

  const getMeetingAndToken = async (id:any) => {
    const meetingId = id == null ? await createStream(token) : id;
    setMeetingId(meetingId);
  };

  return token && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'C.V. Raman',
        mode: mode as any,
      }}
      token={token}>
      <Container />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
  );
};
