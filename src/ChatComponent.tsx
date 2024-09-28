import React, { useState } from 'react';
import { DeepChat } from 'deep-chat-react';

const ChatComponent: React.FC = (backendBaseUrl) => {
    const history = [
        { role: 'ai', text: "Describe the web application you'd like me to create" },
    ];

    return (
        <div style={{width: '100%', display: 'flex', boxSizing: 'border-box'}}>
        <DeepChat
              auxiliaryStyle="
              ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #888;
                border-radius: 5px;
              }
              ::-webkit-scrollbar-track {
                background-color: #292929;
              }"
              connect={{ url: backendBaseUrl + '/api/message'}}
              style={{
                width: '100%',
                height: '80vh',
                borderRadius: '5px',
                backgroundColor: '#292929',
                border: 'unset',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.9)',
                maxWidth: '100%', // Ensure it takes full width
                minWidth: '0',   // Reset any min-width constraints
                // boxSizing: 'border-box'
              }}
              messageStyles={{
                default: {
                    ai: {
                        bubble: {
                            backgroundColor: '#545454',
                            color: 'white',
                        }
                    }
                }
              }}
              textInput={{
                placeholder: { text: 'Type here...' },
                styles: {
                    container: {
                        backgroundColor: '#666666',
                        border: 'unset',
                        color: '#e8e8e8',
                        
                    }
                }
              }}
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
                      backgroundColor: '#848484',
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
        </div>
    )
}

export default ChatComponent; 