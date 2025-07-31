import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {png} from '../../../../assets/png';
import {
  height,
  horizontalScale,
  platform,
  verticalScale,
  width,
} from '../../../../utils';
import {colors} from '../../../../utils/colors_palette';
import {demoImg} from '../../../../assets';

export const Controls = () => {
  return (
    <View style={styles.controls}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconContainer}>
          <FastImage source={{uri: demoImg}} style={styles.icon} />
          <Text style={styles.iconText}>John Doe</Text>
        </View>

        <View style={styles.likesContainer}>
          <View style={styles.likeRow}>
            <View style={styles.likeBox}>
              <Text style={styles.likeText}>Like</Text>
            </View>
            <View style={styles.likeInfo}>
              <Text style={styles.likeDistance}>100 m</Text>
              <FastImage
                source={png.blView}
                style={styles.likeIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.likeBottomRow}>
            <Text style={styles.likeDistance}>100 m</Text>
            <FastImage
              source={png.blLike}
              style={styles.likeIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.actionWrapper}>
          <FastImage source={png.video} style={styles.iconAction} />
        </View>

        <View style={styles.actionWrapper}>
          <FastImage source={png.userAdd} style={styles.iconAction} />
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              placeholderTextColor={colors.white}
            />
          </View>
          <FastImage source={png.like} style={styles.iconAction} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    width,
    height,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 9999999,
  },
  iconWrapper: {
    width: '100%',
    marginVertical: platform === 'ios' ? '0%' : '10%',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: horizontalScale(25),
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderWidth: 1,
    borderColor: colors.black,
  },
  iconText: {
    color: colors.green,
    fontSize: horizontalScale(16),
    fontWeight: '600',
    marginLeft: horizontalScale(10),
  },
  likesContainer: {
    padding: 5,
  },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeBox: {
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  likeText: {
    color: colors.white,
    fontSize: horizontalScale(10),
    fontWeight: '400',
  },
  likeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  likeDistance: {
    color: colors.white,
    marginRight: 5,
  },
  likeIcon: {
    width: 25,
    height: 25,
  },
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: platform === 'ios' ? '10%' : '6%',
  },
  actionWrapper: {
    marginVertical: 5,
    padding: 5,
    alignItems: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: verticalScale(50),
  },
  input: {
    width: '90%',
    borderRadius: horizontalScale(50),
    height: '100%',
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: horizontalScale(20),
  },
  iconAction: {
    width: horizontalScale(50),
    height: horizontalScale(50),
  },
});
