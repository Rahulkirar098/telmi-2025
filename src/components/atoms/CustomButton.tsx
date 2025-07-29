import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, horizontalScale, verticalScale } from '../../utils';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        style={styles.gradient}
        colors={[colors.white, colors.green]}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: verticalScale(60),
    borderRadius: horizontalScale(60),
    overflow: 'hidden',
    marginVertical: verticalScale(20),
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: horizontalScale(18),
    fontWeight: '600',
    color: colors.white,
  },
});
