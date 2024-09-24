import React, {useEffect, useState} from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropzone from './DragAndDrop';
import ChatComponent from './ChatComponent'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendBaseUrl: string = "https://api.stephencowley.com"


function App() {
  useEffect(() => {
    makeResetRequest()
  }, [])

  return (
    <div className="App" data-bs-theme="dark" style={{
      backgroundColor: '#1c1c1c',
      color: '#e8e8e8',
      // width: '100%',
      // height: '100%',
      // justifyContent: 'center',
      // alignItems: 'center',
      }}>
      <Container style={{
          width: '100vw',
          margin: 0,
          
        }}>
        <Row style={{
          height: '10vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          }}
          
          >
          <h3>Your Programming Agent</h3>
        </Row>
        <Row style={{height: '80vh'}}>
          <Col xs={8} s={8} md={8} lg={8}>
            <ChatComponent/>
          </Col>
          <Col>
            <Dropzone />
          </Col>
        </Row>
        <Row style={{height: '10vh'}}>

        </Row>
      </Container>
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

export default App;
