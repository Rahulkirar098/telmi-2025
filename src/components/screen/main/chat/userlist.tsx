// UserListScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {listenForChatList} from './firebaseChat';
import {png} from '../../../../assets/png';
import {width, height, colors} from '../../../../utils';

// Types
type RootStackParamList = {
  navigate: (screen: string, params?: any) => void;
};

export const UserListScreen = () => {
  const currentUserId = '64d123456abc'; // Replace with your backend user ID
  const navigation = useNavigation<RootStackParamList>();
  const [chatList, setChatList] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = listenForChatList(currentUserId, setChatList);
    return unsubscribe;
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={png.bg} style={{width, height}}>
        {chatList.length === 0 ? (
          <View style={styles.center}>
            <Text style={{fontSize: 16, color: colors.white}}>
              No users found
            </Text>
          </View>
        ) : (
          <FlatList
            data={chatList}
            keyExtractor={item => item.userId}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MessagingScreen', {
                    otherUserId: item.userId,
                  })
                }
                style={styles.row}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.userId.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.rowCenter}>
                  <Text style={styles.name}>{item.userId}</Text>
                  <Text style={styles.preview}>{item.lastMessage}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </ImageBackground>
    </View>
  );
};

// ===== Styles =====
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  separator: {height: 1, backgroundColor: '#eee', marginLeft: 72},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {fontWeight: '700', fontSize: 18, color: '#374151'},
  rowCenter: {flex: 1},
  name: {fontSize: 16, fontWeight: '600', color: '#111827'},
  preview: {fontSize: 13, color: '#6b7280', marginTop: 2},
  rowRight: {alignItems: 'flex-end', marginLeft: 8},
  time: {fontSize: 11, color: '#9ca3af'},
  badge: {
    marginTop: 6,
    backgroundColor: '#111827',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {color: '#fff', fontSize: 11, fontWeight: '700'},
});
