import React, {useEffect} from 'react';
import './App.css';
import { DeepChat } from 'deep-chat-react';
import axios from 'axios';

function App() {
  const history = [
    { role: 'ai', text: "Describe the web application you'd like me to create!" },
  ];
  useEffect(() => {
    makeResetRequest()
  }, [])
  return (
    <div className="App">
      <h1>Programming Agent</h1>
      <DeepChat
        connect={{ url: process.env.REACT_APP_BACKEND_SERVER + '/api/message'}}
        style={{ width: '90vw', height: '80vh', borderRadius: '10px' }}
        textInput={{ placeholder: { text: 'Type here...' } }}
        history={history}
      />
    </div>
  );
}

async function makeResetRequest() {
  try {
    const response = await axios.put(process.env.REACT_APP_BACKEND_SERVER + '/api/restart');
  } catch (error) {
    console.error('Error making the PUT request', error)
  }
}

export default App;
