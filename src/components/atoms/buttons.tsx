import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, Width} from '../../utils';

export const Button = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={[styles.mainWrapper]} onPress={onPress}>
      <Text style={{
         color: '#000',
         fontSize: Width * 0.045,
         textAlign: 'center',
         fontFamily: 'Inter',
         fontWeight: '600',
      }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: Width * 0.03,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    shadowRadius: 3,
  },
});
