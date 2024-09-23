import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { useDropzone } from 'react-dropzone';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const Dropzone: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
        setImages(prevList => [
            ...prevList,
            reader.result as string
        ]);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Specifies that we only accept image files
    multiple: true,
  });

  return (
    <div {...getRootProps()} style={{
      border: '2px dashed #ccc',
      borderRadius: '10px',
      width: '20vw',
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    }}>
    
      <input {...getInputProps()} />
      <div style={{ height: '70vh', overflowY: 'auto' }}>
      <Container>
        <Row>
      {images.length ? images.map((image, idx) => (
            <Col>
                <Card style={{ width: '15rem', padding: '0px' }}>
                
                
                <Card.Body style={{ padding: '5px' }}>
                    <Container>
                        <Row>
                    <Col xs={4}>
                    <div style={{ width: '50px', height: '50px' }}> {/* Fixed size for thumbnails */}
                      <Image 
                        src={image} 
                        thumbnail 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      </div>
                    </Col>
                    <Col xs={8}>
                    <p>Card titel</p>
                    </Col>
                    </Row>
                    
                    </Container>
                </Card.Body>
                </Card>
            </Col>
        ))
        : (
        <p>Drag & Drop an image here or click to upload</p>
      )}
      </Row>
      </Container>
      </div>
    </div>
  );
};

export default Dropzone;
