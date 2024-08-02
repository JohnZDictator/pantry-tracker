'use client';

import {Grid, Box, FormControl, TextField, InputAdornment, Avatar, Typography, Stack, Button, Modal } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { firestore } from "@/firebase";

import ResponsiveDrawer from "./responsiveDrawer";
import CustomizedTables from "./customizedTables";
import CameraComponent from "./cameraComponent";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import EnhancedTable from "./paginatedTables";

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

export default function HomePage() {
  const [allPantryItems, setAllPantryItems] = useState([]);
  const [filteredPantryItems, setFilteredPantryItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState('');
  const [filters, setFilters] = useState({s: ''});
  
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const pantryItemList = [];
    docs.forEach((doc) => pantryItemList.push({name: doc.id,  ...doc.data()}));
    setAllPantryItems(pantryItemList);
    setFilteredPantryItems(pantryItemList);
  }

  const addItem = async (item) => {
    const itemEntry = item.toLowerCase();
    const docRef = doc(collection(firestore, 'inventory'), itemEntry);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1});
    } else {
      await setDoc(docRef, {quantity: 1});
    }
    
    await updatePantry();
  }
  const removeItem = async (item) => {
    const itemEntry = item.toLowerCase();
    const docRef = doc(collection(firestore, 'inventory'), itemEntry);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const {quantity} = docSnap.data();
      if(quantity === 1) {
        await deleteDoc(docRef);  
      } else {
        await setDoc(docRef, {quantity: quantity - 1});
      }
    }

    await updatePantry();
  }

  const handleSearch = (event) => {
    setFilters({s: event.target.value});
  };

  useEffect(() => {
    updatePantry();
  }, []);

  useEffect(() => {
    let pantryItems = allPantryItems.filter(p => p.name.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0);
    setFilteredPantryItems(pantryItems);
  }, [filters]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <Box 
    container="true"
    width="100vw" 
    height="100vh"
    display={'flex'}  
    bgcolor={"#181C39"} 
    color={'white'}>
      <ResponsiveDrawer />
      <Box
        width={'100%'}
        margin={'5rem 1rem'}
        padding={'1rem'}
        color={'white'}
        alignItems={'start'}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <FormControl variant="standard">
            <TextField 
              id="search" 
              variant="outlined"
              value={filters.s}
              onChange={handleSearch} 
              sx={{
                width: '40vw',
                padding: '0',
                maxWidth: '500px',
                minWidth: '200px',
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'white', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Border color when focused
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white', // Text color
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'white', // Label color when focused
                },
              }}
              InputProps={{
                style: {
                  color: 'white',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: 'white' }}/>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button 
            variant="contained" 
            onClick={() => {
              handleOpen();
            }} 
            sx={{
              backgroundColor: 'rgb(117,100,226)', 
              marginLeft: '1rem', 
              ":hover, :active": {
                backgroundColor: 'rgba(117,100,226,0.8)'
              }
            }}
          >Add Item</Button>
          <Modal
            open={open}
            onClose={handleClose}
            sx
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              width={400}
              bgcolor={'white'}
              border={'1px solid rgb(117,100,226)'}
              boxShadow={24}
              p={4}
              gap={3}
              position={'absolute'}
              top='50%'
              left='50%'
              sx={{
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Typography variant="h6">Add Item</Typography>
              <Stack width={'100%'} direction='row' spacing={2}>
                <TextField variant="outlined" fullWidth value={item} />
                <Button 
                  variant="contained" 
                  sx={{
                    backgroundColor: 'rgb(117,100,226)', 
                    color: 'white', 
                    ":hover, :active": {
                      backgroundColor: 'rgba(117,100,226,0.8)'
                    }}
                  }
                  onClick={() => {
                    addItem(item);
                    setItem('');
                    handleClose();
                  }}
                >Add</Button>
              </Stack>
              <CameraComponent addItem={addItem} handleClose={handleClose}/>
            </Box>
          </Modal>  
        </Box>
        <Box sx={{margin: '2rem 0'}}>
          <CustomizedTables filteredPantryItems={filteredPantryItems} removeItem={removeItem} addItem={addItem} />
        </Box>
    </Box>
  </Box>
}
