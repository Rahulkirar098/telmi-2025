import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {Image, Text, View, StyleSheet, ImageSourcePropType} from 'react-native';

import {Home} from '../../components/screen/main';
import {horizontalScale, verticalScale, Width, width} from '../../utils';
import {png} from '../../assets/png';

type TabParamList = {
  message: undefined;
  home: undefined;
  account: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabIcon = (
  routeName: keyof TabParamList,
  focused: boolean,
): React.ReactNode => {
  const icons: Record<keyof TabParamList, ImageSourcePropType> = {
    message: png.message,
    home: png.home,
    account: png.account,
  };

  const iconStyle = focused ? styles.iconFocused : styles.icon;

  return (
    <View style={styles.tabItem}>
      <Image source={icons[routeName]} style={iconStyle} />
      <Text
        style={[
          styles.tabLabel,
          {
            color: focused
              ? 'rgba(53, 211, 191, 1)'
              : ' rgba(255, 255, 255, 0.4)',
          },
        ]}>
        {routeName}
      </Text>
    </View>
  );
};

export const BottomTab: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({route}): BottomTabNavigationOptions => ({
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({focused}) =>
            renderTabIcon(route.name as keyof TabParamList, focused),
        })}>
        <Tab.Screen
          name="message"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="account"
          component={Home}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: '80%',
    height: verticalScale(60),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: horizontalScale(60),
    paddingTop: verticalScale(15),
    position: 'absolute',
    bottom: verticalScale(20),
    left: Width / 2 - horizontalScale(10),
    right: Width / 2 - horizontalScale(10),
  },
  tabItem: {
    width: horizontalScale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: horizontalScale(25),
    height: horizontalScale(25),
  },
  iconFocused: {
    width: horizontalScale(30),
    height: horizontalScale(30),
  },
  tabLabel: {
    marginTop: verticalScale(5),
    textTransform: 'capitalize',
  },
});
