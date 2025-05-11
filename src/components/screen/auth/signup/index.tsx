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
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

export const Signup = () => {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

          {/* Form Inputs */}
          <CustomInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            showToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <CustomInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter your password"
            secureTextEntry
            showToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />

          {/* Signup Button */}
          <CustomButton
            title="Signup"
            onPress={() => console.log('Signup pressed')}
          />

          {/* Footer Link */}
          <View style={styles.footerLinks}>
            <Text style={styles.guestText}>Already have an account. </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.linkText}>Login</Text>
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
  },
  linkText: {
    fontSize: horizontalScale(18),
    fontWeight: '400',
    color: colors.green,
    textDecorationLine: 'underline',
  },
});
