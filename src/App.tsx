import React, {useEffect, useState} from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropzone from './DragAndDrop';
import ChatComponent from './ChatComponent'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendBaseUrl: string = "https://api.stephencowley.com"

// Configure Amplify in index file or root file
Amplify.configure({ ...awsExports });

function App() {
  const [userName, setUserName] = useState<string>("")
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    makeResetRequest()
  }, [])

  const handleResetClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    makeUserResetRequest(userName)
    resetComponent()
  }

  

  const resetComponent = () => {
    setKey(prevKey => prevKey + 1); // Change the key to force a remount
  };

  return (
    <div className="App" data-bs-theme="dark" style={{
      backgroundColor: '#1c1c1c',
      color: '#e8e8e8',
      // width: '100%',
      // height: '100%',
      // justifyContent: 'center',
      // alignItems: 'center',
      }}>
        <Authenticator>
            {({ signOut, user }) => {
              setUserName(user ? user.username: "")

              return (
                <div>
                    <Container style={{
                      width: '100vw',
                      margin: 0,
                      
                    }}>
                    <Row style={{
                      height: '8vh',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      }}>
                        <Col xs={8} s={8} md={8} lg={8}>
                        <h3>Your Programming Agent</h3>
                        </Col>
                        <Col>
                        <p>Welcome {user && user.username}</p>
                        </Col>
                        <Col xs={2}>
                        <Button onClick={signOut}>Sign out</Button>
                        </Col>
                    </Row>
                    <Row style={{height: '80vh'}}>
                      <Col xs={8} s={8} md={8} lg={8}>
                        <ChatComponent key={key} backendBaseUrl={backendBaseUrl} userName={user ? user.username : ""} />
                      </Col>
                      <Col>
                        <Dropzone key={key} backendBaseUrl={backendBaseUrl} userName={user ? user.username : ""} />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs={6}>
                      <Button className="me-2" onClick={() => window.open('https://' + user?.username + '.stephencowley.com', '_blank')}>Visit Your App!</Button>
                      <Button onClick={handleResetClick}>Reset</Button>
                      </Col>
                      
                    </Row>
                  </Container>
                    
                    
                </div>
            )}}
        </Authenticator>
    
    </div>
  );
}

async function makeResetRequest() {
  try {
    const response = await axios.put(backendBaseUrl + '/api/restart');
  } catch (error) {
    console.error('Error making the PUT request', error)
  }
}

async function makeUserResetRequest(userName: string) {
  try {
    const response = await axios.get(
      backendBaseUrl + '/api/reset', 
      {
        headers: {
          'username': userName // Replace 'your-username' with the actual username
        }
      }
    )
  } catch (error) {
      console.error('Error making the GET request', error)
  }
}

export default App;
