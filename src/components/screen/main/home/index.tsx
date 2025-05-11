import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {png} from '../../../../assets/png';
import {height, horizontalScale, verticalScale, width} from '../../../../utils';
import {CustomButton} from '../../../atoms';
import {CategoryList} from '../../../molicues';

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

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

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

          <Image source={png.logo} style={styles.logo} resizeMode="center" />

          <CustomButton
            title="Login"
            onPress={() => console.log('Login pressed')}
          />
          <CustomButton
            title="Login"
            onPress={() => console.log('Login pressed')}
          />

          <View style={{marginVertical: verticalScale(20)}}>
            <CategoryList
              data={data}
              setSelectedCategory={setSelectedCategory}
            />
          </View>
        </ScrollView>
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
