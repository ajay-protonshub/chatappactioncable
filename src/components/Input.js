import React, { useEffect, useState } from 'react';
import {useHistory } from 'react-router-dom'
const Input = ({ message, setMessage, onSendMessage, messages }) => {
  console.log(`messages from sender `, messages)
  const [emptyMessages, SetEmptyMessages]=useState([{ message_id: '', 
    body: '', sender_name: '', sender_id: '', 
  message_type: '', read_status: '', date: '' }])
  const [isMultiline, setIsMutliline] = useState(false)
  const currentUserId = localStorage.getItem('sender_id')
  let history=useHistory()
  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [message]);

  const listener = event => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      if (message !== '') {
        if (event.shiftKey) {
          setIsMutliline(true)
        }
        else {
          event.preventDefault()
          onSendMessage();
          setMessage('');
          setIsMutliline(false)
        }
      }
      else event.preventDefault()
    }
  }
  const Signout=async()=>{
 await  localStorage.clear()
 await localStorage.removeItem("messages")
    history.push('/')
  
  }
  return (
    <div style={pageStyles}>
      <div style={chatStyles}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={headerStyles}>Demo Action Cable Chat app</div>
          <div style={signout} onClick={Signout}>Sign Out</div>
        </div>
        <div style={listStyles}>
          {messages &&
            messages.map((message) => (
              message.sender_id != currentUserId ?
                <div key={message.message_id}
                >
                  <div>
                    <div>
                      <h5>
                        {message.sender_name}
                      </h5>
                      <p>{message.date}</p>
                    </div>
                    <h4 style={{ backgroundColor:'#e7feff', color: '#333' , fontSize:24 }} >
                      {message.body}
                    </h4>
                  </div>
                </div>
                :

                <div>
                  <div>
                    <p>{message.date}</p>
                    <h5

                    >
                      {message.sender_name}
                    </h5>
                  </div>
                  <h4 style={{ backgroundColor: '#E5E4E2', color: '#333', fontSize:24 }}>
                    {message.body}
                  </h4>
                </div>

            ))}
        </div>
        <div style={footerStyles}>
          <input
            type="text"
            style={inputStyles}
            placeholder="Type your message"
            name="message"
            value={message}
              onKeyPress={e => {
                if (e.key !== 'Enter') return;
                setMessage(message);
              }}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            style={buttonStyles}
            onClick={onSendMessage}
          >
            Send Message
        </button>
        </div>
      </div>
    </div>

  );
}
const pageStyles = {
  alignItems: 'center',
  background: '#282c34',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
};

const chatStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '50vh',
  width: '50%',
};

const headerStyles = {
  background: '#323742',
  color: 'white',
  fontSize: '1.4rem',
  padding: '10px 15px',
};
const signout = {

  background: '#323742',
  color: 'white',
  fontSize: '14px',
  padding: '5px 10px',
  cursor: 'pointer'

};
const listStyles = {
  alignItems: 'flex-start',
   backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'auto',
  padding: '10px',
};

const messageStyles = {
  backgroundColor: '#e7feff',
  borderRadius: '5px',
  color: '#333',
  fontSize: '1.1rem',
  margin: '5px',
  padding: '8px 15px',
};

const footerStyles = {
  display: 'flex',
};

const inputStyles = {
  flexGrow: 1,
  fontSize: '1.1rem',
  padding: '10px 15px',
};
const messageStylesFor = {
  backgroundColor: '#E5E4E2',
  borderRadius: '5px',
  color: '#333',
  fontSize: '1.1rem',
  margin: '5px',
  padding: '8px 15px',
};
const buttonStyles = {
  fontSize: '1.1rem',
  padding: '10px 15px',
};
export default Input