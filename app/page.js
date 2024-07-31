'use client';

import {Grid, Box, FormControl, TextField, InputAdornment, Avatar, Typography, Stack, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import ResponsiveDrawer from "./responsiveDrawer";
import CustomizedTables from "./customizedTables";

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
  return <Box 
    container
    width="100vw" 
    height="100vh"
    display={'flex'}  
    bgcolor={"#181C39"} 
    color={'white'}>
      <ResponsiveDrawer />
      <Box
        width={'100%'}
        margin={'5rem 1rem'}
        padding={'0.5rem'}
        border={'1px solid grey'}
        borderRadius={'0.5rem'}
        color={'white'}
        alignItems={'start'}
      >
        <FormControl variant="standard">
          <TextField 
            id="search" 
            variant="outlined"
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
        <Box sx={{margin: '2rem 0'}}>

        </Box>
        <CustomizedTables  />
    </Box>
  </Box>
}
