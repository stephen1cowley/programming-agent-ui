import React, { useState } from 'react';
import { DeepChat } from 'deep-chat-react';

const ChatComponent: React.FC = (backendBaseUrl) => {
    const history = [
        { role: 'ai', text: "Describe the web application you'd like me to create" },
    ];

    return (
        <DeepChat
              connect={{ url: backendBaseUrl + '/api/message'}}
              style={{ width: '60vw', height: '80vh', borderRadius: '5px' }}
              textInput={{ placeholder: { text: 'Type here...' } }}
              history={history}
              submitButtonStyles={{
                submit: {
                  container: {
                    default: {
                      width: '0.95em',
                      height: '0.95em',
                      justifyContent: 'center',
                      display: 'flex',
                      borderRadius: '25px',
                      padding: '0.3em',
                      backgroundColor: '#00c82a'
                    }
                  },
                  svg: {
                    content: '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 115.4 122.88\"><path d=\"M24.94,67.88A14.66,14.66,0,0,1,4.38,47L47.83,4.21a14.66,14.66,0,0,1,20.56,0L111,46.15A14.66,14.66,0,0,1,90.46,67.06l-18-17.69-.29,59.17c-.1,19.28-29.42,19-29.33-.25L43.14,50,24.94,67.88Z\"/></svg>',
                    styles: {
                      default: {
                        filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(315deg) brightness(99%) contrast(102%)",
                        transform: 'scale(0.95)'
                      }
                    }
                  }
                }
              }}
            />
    )
}

export default ChatComponent; 