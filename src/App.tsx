import React, {useEffect, useState} from 'react';
import './App.css';
import { DeepChat } from 'deep-chat-react';
import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const backendBaseUrl: string = "https://api.internal.programming-agent.internal"

function App() {
  const history = [
    { role: 'ai', text: "Describe the web application you'd like me to create!" },
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
      <h1>Your Programming Agent</h1>
      <DeepChat
        connect={{ url: backendBaseUrl + '/api/message'}}
        style={{ width: '90vw', height: '80vh', borderRadius: '10px' }}
        textInput={{ placeholder: { text: 'Type here...' } }}
        history={history}
      />
      <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload to S3</button>
      {uploadMessage && <p>{uploadMessage}</p>}
      </div>
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
