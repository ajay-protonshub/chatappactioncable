/*eslint-disable*/
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import querystring from 'querystring';
import ActionCable from 'actioncable';
import Input from '../src/components/Input';
import Chat from '../src/components/Chat';



let chatChannel = null;
const baseUrl="http://95cd991eabc8.ngrok.io/"
const ChatDashboard = ({ location }) => {
  
  const receiver_id=location.state.state
  const current_user=location.state.current_user


  const [message, setMessage] = useState('');
  const [roomId, SetRoomId]= useState('')
  const [channelName, SetChannelName]= useState('')
  const [viewMessages, addMessages]=useState([])
  const user_id=localStorage.getItem('sender_id')

 
  useEffect(() => {
   addMessages(JSON.parse(localStorage.getItem("messages")) || []);
   let data={
      receiver_id:receiver_id,
      user_id:user_id

    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    fetch(`${baseUrl}api/v1/chats/`,{
      method:'POST',
      headers:{
        "access-control-allow-origin" : "*",
        "Content-type": "application/json; charset=UTF-8"
      },
       
      body:JSON.stringify(data)
    })
    .then(res => {
        if(res.status >= 400) {
            throw new Error("Server responds with error!");
        }
        return res.json();
    })
    .then(data => {
      if(data.response_data){
        SetRoomId(data.response_data.id)
        SetChannelName(data.response_data.name)
      }
      console.log(`response add data`, data)
      
    },
    err => {
      console.log(err)
    });
     
    }, []);
    useEffect(()=>{
      localStorage.setItem("messages", JSON.stringify(viewMessages));
     })
  


  const setChatChannel = data => {
    chatChannel = data
  }

  const sendMessage = () => {
    const data = {
      message: message,
      user_id: current_user,
      chat_id: roomId,
      message_type: "0",
      attachment: null,
      receiver_id: receiver_id,
    }
    console.log(`data`, data)
    chatChannel && chatChannel.perform('speak', data);
    setMessage("")
  }

  const getResponseMessage = (data) => {
    let message_id=data.message_id;
    let body=data.body;
    let sender_name=data.sender_name;
    let sender_id=data.sender_id;
    let message_type=data.message_type
    let read_status = data.read_status
    let date= data.date

    addMessages(viewMessages => [...viewMessages, { message_id: message_id, 
      body: body, sender_name: sender_name, sender_id: sender_id, 
    message_type: message_type, read_status: read_status, date: date }]); 
  }

  const CableApp = {}
  CableApp.cable = ActionCable.createConsumer(`${baseUrl}cable?email=${current_user}`)


  return (
   
     <div>
    <Chat 
        heading={current_user}
        messages={viewMessages}
        currentUserId={1}
        cableApp={CableApp}
        roomId={roomId}
        message={message}
        currentUser={current_user}
        getResponseMessage={getResponseMessage}
        setChatChannel={setChatChannel}
        channelname={channelName}
    />
    <Input 
        messages={viewMessages}
        message={message} 
        setMessage={setMessage}
        onSendMessage={sendMessage}
    />
     
     </div>
  );
}

export default ChatDashboard