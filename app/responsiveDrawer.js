import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import Link from 'next/link';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [activeNavBar, setActiveNavBar] = React.useState(0);
  
  const handleDrawerClose = () => {
  setIsClosing(true);
  setMobileOpen(false);
};

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerNavigation = (index) => {
    if(activeNavBar != index) {
        setActiveNavBar(index);
    }
  };

  const drawer = (
    <div>
    <Toolbar />
      <Divider />
      <List>
        {['Items', 'Recipes'].map((text, index) => (
          <Link href={index === 0 ? '/' : 'recipes'} style={{textDecoration: 'none'}}>
            <ListItem key={text} disablePadding>
              <ListItemButton 
                  sx={{
                      color: activeNavBar === index ? 'white' : 'rgb(152, 166, 197)', 
                      backgroundColor: activeNavBar === index ? 'rgb(117, 100, 226)' : 'transparent',
                      justifyContent: 'start',
                      ':hover': {
                      backgroundColor: 'rgba(117, 100, 225, 0.8)'
                      },
                      ':active': {
                      backgroundColor: 'rgba(117, 100, 225, 0.8)'
                      },
                      padding: '12px 16px',
                  }}
                  onClick={() => handleDrawerNavigation(index)}
              >
                <ListItemIcon> 
                  {index === 0 ? <EventNoteOutlinedIcon sx={{color: activeNavBar === index ? 'white' : 'rgb(152, 166, 197)'}} /> : <FastfoodOutlinedIcon sx={{color: activeNavBar === index ? 'white' : 'rgb(152, 166, 197)'}} />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#181C39',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Pantry Tracker
          </Typography>
          <LocalDiningOutlinedIcon sx={{color: 'white', margin: '0 0.25rem'}} />   
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#181C39' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#181C39' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
