import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { main_BG_Video } from '../../../../assets';

type RootStackParamList = {
  login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

export const SplashVideoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={main_BG_Video}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        paused={false}
        repeat={false}
        muted={false}
        controls={false}
        playInBackground={false}
        playWhenInactive={false}
        onEnd={() => navigation.navigate('login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
