'use client';

import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Button, Stack, Box } from '@mui/material';
import axios from "axios";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CameraComponent = ({ handleClose}) => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [takeImage, setTakeImage] = useState(false);

  const handleCapture = () => {
    const photo = camera.current.takePhoto();
    setImage(photo);
    handleCameraClose();
  };

  const handleRemove = () => {
    setImage(null);
  };

  const handleCameraOpen = () => {
    setTakeImage(true);
  };

  const handleCameraClose = () => {
    setTakeImage(false);
  };

  const uploadImage = async (photo) => {
    const blob = await fetch(photo).then(res => res.blob);
    const storageRef = ref(storage, `images/${Date.now()}.jpg`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    identifyItem(downloadURL);
  };

  // TODO: Identify item with gpt vision
  // couldn't do that because of credit card I don't own one, I am researching for free ones, I am checking out detectron2
  const identifyItem = async (imageURL) => {
    try {
      const response = await axios.post('api/identifyItem', {
        imageUrl: imageURL,
      });

      const itemName = response.data.itemName;
      // addItem(itemName);
    } catch(e) {
      console.error("Error identifying item: ", e);
    }
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
      {takeImage && !image ? (
        <Camera ref={camera} />
      ) : !takeImage && image ? (
        <Box
          component="img"
          sx={{ width: '100%', maxWidth: 300, height: 'auto' }}
          src={image}
          alt="Captured"
        />
      ) : (<></>)}
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        {takeImage && !image ? (
          <Button variant="contained" color="primary" onClick={handleCapture}>
            Capture
          </Button>
        ) : !takeImage && image ? (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="secondary" onClick={() => {uploadImage(image); handleClose();}}>
              Upload
            </Button>
            <Button variant="contained" color="secondary" onClick={handleRemove}>
              Remove
            </Button>
          </Stack>
        ) : (
          <Button variant="contained" color="primary" onClick={handleCameraOpen}>
            Take a photo
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default CameraComponent;