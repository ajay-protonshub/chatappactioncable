import React, { useEffect } from 'react';
import Message from './Messages';


const Chat = ({ 

  message,
  channelname,
  messages,
  currentUserId,
  cableApp,
  roomId, 
  getResponseMessage,
  setChatChannel,
  currentUser
}) => {
  console.log(`messages from chat`, messages)
  let chatChannel = null;

  const createSocket = () => {

    if (roomId) {
    console.log("room-id", roomId)
      chatChannel = cableApp.cable.subscriptions.create(
      {
        channel: 'ChatChannel',
        chat_id: roomId,
        user_id:localStorage.getItem('sender_id')
      },

        {
          connected: () => {
            console.log('--------- ChatChannel connected');
          },
          disconnect: () => {
            console.log('--------- ChatChannel disconnect');
          },
          received: (data) => {
            console.log(`received function is calling..`, data)
            console.log('--------- Received connected');
            getResponseMessage(data);
          },

        }
      )
      setChatChannel(chatChannel)
      console.log(`subscribe`, cableApp.subscriptions)
    }
  }


  useEffect(() => {
    createSocket();
  }, [roomId]);

  return (
    
      <Message 
        messages={messages}
        currentUserId={currentUserId}
        currentUser={currentUser}      
      />
   
  );
}

export default Chat