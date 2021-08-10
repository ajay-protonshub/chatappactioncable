import React from 'react';
//import { makeStyles } from "@material-ui/core/styles";



//const useStyles = makeStyles(chatStyle);

const Message = ({ messages, currentUserId }) => {
 // const classes = useStyles();

  return (
    <div>
      {/* {messages&&
      messages.map((message) => (
        message.sender_id !== currentUserId ?
          <div key={message.message_id} style={{ 
            display: "flex",
            boxOrient: "vertical",
            boxDirection: "normal",
            flexDirection: "column",
            boxPack: "center",
            justifyContent: "center"
          }}
          >
           
            <div>
              <div>
                <h5>
                  {message.sender_name}
                </h5>
                <p>12:00</p>
              </div>
              <h4  >
                {message.body}
              </h4>
            </div>
          </div>
          :
          
            <div>
              <div>
                <p >12:00</p>
                <h5 
                
                >
                  {message.sender_name}
                </h5>
              </div>
              <h4>
                {message.body}
              </h4>
            </div>
          
      ))} */}
    </div>
  );
}

export default Message