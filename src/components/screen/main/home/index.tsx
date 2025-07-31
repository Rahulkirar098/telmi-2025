import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {png} from '../../../../assets/png';
import {height, horizontalScale, verticalScale, width} from '../../../../utils';
import {CustomButton, Loader} from '../../../atoms';
import {CategoryList} from '../../../molicues';
import {requestCameraAndMicPermissions} from '../../../../helper';

//Modal
import {FriendRequest, WelcomeModal} from '../../../../modal';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../../redux/reducer/users';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// Redux

const data: {
  id: 'Sports' | 'Music' | 'Pop Culture' | 'Gaming' | 'TV/Films' | 'Politics';
  iconName: any;
}[] = [
  {id: 'Sports', iconName: png.sport},
  {id: 'Music', iconName: png.music},
  {id: 'Pop Culture', iconName: png.pop_culture},
  {id: 'Gaming', iconName: png.gaming},
  {id: 'TV/Films', iconName: png.tv},
  {id: 'Politics', iconName: png.politics},
];

// Types
type RootStackParamList = {
  navigate: (screen: string) => void;
};

///Video SDK
import {createStream} from '../../../../api/videoSdkApiCall';
import {token} from '../../../../api/env';
import {Constants} from '@videosdk.live/react-native-sdk';

export const Home = () => {
  //Navigation
  const navigation = useNavigation<RootStackParamList>();

  // Redux
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.userAuthReducer);

  // State to manage category selection
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal
  const [isWelcome, setIsWelcome] = useState(true);

  const requireUserDataToWatch = () => {
    return {
      userId: user._id,
      profilePhoto: user.profilePhoto,
      fullName: user.fullName,
      category: selectedCategory,
    };
  };

  //GO Live
  const [loader, setLoader] = useState(false);
  const [streamId, setStreamId] = useState(null);

  const initializeStream = async (id: any) => {
    const newStreamId = id || (await createStream(token));
    setStreamId(newStreamId);
    setLoader(false);
    console.log(loader, '===@@@3');
    return newStreamId;
  };

  const handleGoLive = async () => {
    // setLoader(true);
    // console.log(loader, '===@@@2');
    // let id = await initializeStream(streamId);
    // console.log(id, '===@@@1');

    // // let granted = await requestCameraAndMicPermissions();
    navigation.navigate('streamHls');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={png.bg} style={{width, height}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: horizontalScale(20),
          }}>
          <View
            style={{
              marginTop: verticalScale(40),
              alignItems: 'flex-end',
            }}>
            <Image source={png.equalizer} style={{width: 25, height: 25}} />
          </View>

          <Image source={png.logo} style={styles.logo} resizeMode="contain" />

          <CustomButton
            title="WATCH"
            onPress={() => console.log('Login pressed')}
          />
          <CustomButton title="GO LIVE" onPress={handleGoLive} />

          <View style={{marginVertical: verticalScale(20)}}>
            <CategoryList
              data={data}
              setSelectedCategory={setSelectedCategory}
            />
          </View>
        </ScrollView>

        <Loader visible={loader} />

        {/* <FriendRequest
          visible={true}
          userName="John Doe"
          profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNVnSmc1NA1nDSwwGnx0iCVK4n_Vj0TuqlMv0Jbg-zP2uhO8&s"
          onAccept={() => console.log("Accepted")}
          onDecline={() => console.log("Declined")}
        />
        <WelcomeModal
          visible={isWelcome}
          onContinue={() => setIsWelcome(false)}
        />
        */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: verticalScale(100),
  },
});
