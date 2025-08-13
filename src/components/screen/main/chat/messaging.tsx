// MessagingScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {listenForMessages, sendMessage} from './firebaseChat';

// Types
type RootStackParamList = {
  navigate: (screen: string) => void;
};

export const MessagingScreen = () => {
  const route = useRoute<any>();
  const currentUserId = '64d123456abc'; // Replace with backend user ID
  const {otherUserId} = route.params;

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = listenForMessages(
      currentUserId,
      otherUserId,
      setMessages,
    );
    return unsubscribe;
  }, []);

  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const isMe = item.senderId === currentUserId;
          return (
            <View style={{marginVertical: 5}}>
              <Text style={{color: isMe ? 'blue' : 'green'}}>
                {isMe ? 'Me' : otherUserId}: {item.text}
              </Text>
            </View>
          );
        }}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type a message"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
      <Button
        title="Send"
        onPress={() => {
          sendMessage(currentUserId, otherUserId, text);
          setText('');
        }}
      />
    </View>
  );
};

// ===== Styles =====
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
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
