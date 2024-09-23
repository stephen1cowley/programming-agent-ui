import React, {useEffect, useState} from 'react';

import { DeepChat } from 'deep-chat-react';
import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Button from 'react-bootstrap/Button';
import { ThemeProvider } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropzone from './DragAndDrop';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const backendBaseUrl: string = "https://api.stephencowley.com"


function App() {
  
  const history = [
    { role: 'ai', text: "Describe the web application you'd like me to create" },
  ];

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
    <div className="App">
      <Container>
        <Row>
          <h1>Your Programming Agent</h1>
        </Row>
        <Row>
          <Col>
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
