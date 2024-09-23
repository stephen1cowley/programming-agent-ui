import React, {useEffect, useState} from 'react';


import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Button from 'react-bootstrap/Button';
import { ThemeProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropzone from './DragAndDrop';
import ChatComponent from './ChatComponent'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendBaseUrl: string = "https://api.stephencowley.com"


function App() {

  // AWS S3 bucket details
  const REGION = 'eu-west-2'; // Your bucket region
  const BUCKET_NAME = 'my-programming-agent-img-store';

  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID + '', // You can use dummy keys for a public bucket
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY + '',
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>('');

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!!!');
      return;
    }

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: selectedFile.name,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      setUploadMessage(`File uploaded successfully!`);
      console.log('Upload success:', data);
    } catch (error) {
      console.error('Error uploading the file:', error);
      setUploadMessage('File upload failed.');
    }
  };

  useEffect(() => {
    makeResetRequest()
  }, [])
  return (
    <div className="App" data-bs-theme="dark" style={{
      backgroundColor: '#1c1c1c',
      color: '#e8e8e8',
      }}>
      <Container  style={{width: '100vw'}}>
        <Row style={{
          height: '10vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',}}>
          <h3>Your Programming Agent</h3>
        </Row>
        <Row style={{height: '80vh'}}>
          <Col>
            <ChatComponent />
          </Col>
          <Col>
            {/* <div>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Upload to S3</Button>
            {uploadMessage && <p>{uploadMessage}</p>}
            </div> */}
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
