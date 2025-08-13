// firebaseChat.ts
import database from "@react-native-firebase/database";

export function createRoomId(userA: string, userB: string) {
  return [userA, userB].sort().join("_");
}

export async function sendMessage(
  currentUserId: string,
  otherUserId: string,
  text: string
) {
  if (!text.trim()) return;

  const roomId = createRoomId(currentUserId, otherUserId);
  const messageId = database().ref().push().key!;
  const messageData = {
    text,
    senderId: currentUserId,
    timestamp: Date.now(),
  };

  // Save message in chat room
  await database().ref(`/chats/${roomId}/${messageId}`).set(messageData);

  // Update last message for both users
  await database().ref(`/userChats/${currentUserId}/${otherUserId}`).set({
    lastMessage: text,
    timestamp: Date.now(),
  });
  await database().ref(`/userChats/${otherUserId}/${currentUserId}`).set({
    lastMessage: text,
    timestamp: Date.now(),
  });
}

export function listenForMessages(
  currentUserId: string,
  otherUserId: string,
  callback: (messages: any[]) => void
) {
  const roomId = createRoomId(currentUserId, otherUserId);
  database()
    .ref(`/chats/${roomId}`)
    .orderByChild("timestamp")
    .on("value", snapshot => {
      const msgs: any[] = [];
      // @ts-ignore
      snapshot.forEach(child => {
        msgs.push({ id: child.key, ...child.val() });
      });
      callback(msgs);
    });

  return () => database().ref(`/chats/${roomId}`).off();
}

export function listenForChatList(
  currentUserId: string,
  callback: (chatList: any[]) => void
) {
  database()
    .ref(`/userChats/${currentUserId}`)
    .orderByChild("timestamp")
    .on("value", snapshot => {
      const chats: any[] = [];
      // @ts-ignore
      snapshot.forEach(child => {
        chats.push({
          userId: child.key,
          ...child.val(),
        });
      });
      chats.sort((a, b) => b.timestamp - a.timestamp); // latest first
      callback(chats);
    });

  return () => database().ref(`/userChats/${currentUserId}`).off();
}
