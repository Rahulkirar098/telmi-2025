import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Assets
import {main_BG_Video} from '../../../../assets';
import {png} from '../../../../assets/png';

// Utils & Constants
import {colors, horizontalScale, verticalScale} from '../../../../utils';

// Components
import {CustomButton, CustomInput} from '../../../atoms';

// Navigation
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Types
type RootStackParamList = {
  login: undefined;
  opt_verification: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login', 'opt_verification'>;

export const ForgotPassword = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp>();

  // State Hooks
  const [email, setEmail] = useState('');

  // Render
  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={main_BG_Video}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Logo */}
          <Image source={png.logo} style={styles.logo} resizeMode="center" />

          {/* Email Input */}
          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          {/* Login Button */}
          <CustomButton
            title="Continue"
            onPress={() => navigation.navigate('opt_verification')}
          />

          {/* Signup Link */}
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.guestText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: horizontalScale(40),
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: verticalScale(100),
  },
  guestText: {
    fontSize: horizontalScale(18),
    fontWeight: '400',
    color: colors.white,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
});
