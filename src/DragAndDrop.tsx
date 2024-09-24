import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { useDropzone } from 'react-dropzone';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


const uploadFileToS3 = async (bucketName: string, key: string, file: File) => {
  // Create S3 client
  const s3Client = new S3Client({ region: 'eu-west-2' });

  // Set upload parameters
  const params = {
    Body: file,
    Bucket: bucketName,
    Key: key,
    ContentType: file.type
  };

  try {
    // Upload file to S3
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully", response);
  } catch (error) {
    console.error("Error uploading file", error);
  }
};

const Dropzone: React.FC = () => {
  const [images, setImages] = useState<{name: string; dataUrl: string}[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prevList => [
          ...prevList,
          {
            name: file.name,
            dataUrl: reader.result as string
          }
        ]);
      };
      reader.readAsDataURL(file);

      // Now upload to S3
      uploadFileToS3('my-programming-agent-img-store', 'uploads/' + file.name, file)
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, idx) => idx !== index);

    // Update the state with the new array of images
    setImages(updatedImages);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Specifies that we only accept image files
    multiple: true,
  });

  return (
    <div {...getRootProps()} style={{
      borderRadius: '5px',
      width: '20vw',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#292929',
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.9)'
    }}>
      

      <input {...getInputProps()} />
      <div style={{ width: '100%', height: '80vh', overflowY: 'auto', padding: '10px' }}>
        
        <Container>
          <Col>
            {images.length ? images.map((image, idx) => (
              <Row className="d-flex align-items-center justify-content-center">
                <Card style={{ padding: '5px', cursor: 'auto' }} onClick={(e) => (e.stopPropagation())}>
                  <Card.Body style={{ padding: '1px' }}>
                    <Container>
                      <Row>
                        <Col xs={3} style={{padding: '0px'}}>
                          <div style={{ width: '50px', height: '50px' }}> {/* Fixed size for thumbnails */}
                            <Image
                              src={image.dataUrl}
                              thumbnail
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        </Col>
                        <Col style={{padding: '0px', overflow: 'auto'}}>
                          <small>{image.name}</small>
                        </Col>

                        <Col xs={2}>
                        <CloseButton onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(idx);
                          }}/>           
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              </Row>
            ))
              : (
                <p style={{color: '#fff'}}>Drag & Drop an image here or click to upload</p>
              )}
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default Dropzone;