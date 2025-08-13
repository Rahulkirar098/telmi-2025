import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import database from '@react-native-firebase/database';
import {png} from '../../../../assets/png';
import {
  width,
  height,
  colors,
  horizontalScale,
  platform,
} from '../../../../utils';

export const MessagingScreen = ({route}: any) => {
  const {chatId, currentUserID, otherUserID} = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const ref = database().ref(`messages/${chatId}`);

    const listener = ref.on('value', snapshot => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      setMessages(list.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => ref.off('value', listener);
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim()) {
      return;
    }

    const messageData = {
      senderId: currentUserID,
      text,
      timestamp: Date.now(),
    };

    await database().ref(`messages/${chatId}`).push(messageData);

    // Update last message in userChats
    await database().ref(`userChats/${currentUserID}/${otherUserID}`).update({
      lastMessage: text,
      timestamp: Date.now(),
    });

    await database().ref(`userChats/${otherUserID}/${currentUserID}`).update({
      lastMessage: text,
      timestamp: Date.now(),
    });

    setText('');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={png.bg}
        style={{
          width,
          height,
          padding: horizontalScale(20),
          paddingTop: platform == 'ios' ? '15%' : '10%',
        }}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const isSender = item.senderId === currentUserID;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: isSender ? 'flex-end' : 'flex-start',
                  marginVertical: 4,
                  paddingHorizontal: 10,
                }}>
                <View
                  style={{
                    backgroundColor: isSender ? colors.red : colors.green,
                    padding: 10,
                    borderRadius: 10,
                    maxWidth: '70%',
                  }}>
                  <Text>{item.text}</Text>
                </View>
              </View>
            );
          }}
        />

        <View
          style={{flexDirection: 'row', borderWidth: 1, borderColor: '#ccc'}}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              color: colors.white,
            }}
            placeholderTextColor={colors.white}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </ImageBackground>
    </View>
  );
};

// ===== Styles =====
const styles = StyleSheet.create({
  container: {flex: 1},
  bubbleRow: {flexDirection: 'row', paddingHorizontal: 10, marginVertical: 4},
  left: {justifyContent: 'flex-start'},
  right: {justifyContent: 'flex-end'},
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  meBubble: {backgroundColor: '#111827', borderTopRightRadius: 4},
  themBubble: {backgroundColor: '#e5e7eb', borderTopLeftRadius: 4},
  bubbleText: {fontSize: 15, lineHeight: 20},
  meText: {color: '#fff'},
  themText: {color: '#111827'},
  meta: {alignSelf: 'flex-end', fontSize: 10, marginTop: 4, opacity: 0.7},
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
  },
  sendBtn: {
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  sendText: {color: '#fff', fontWeight: '700'},
});
