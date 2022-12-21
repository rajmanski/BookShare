import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { getAuth, signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase'

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const PersistentDrawerLeft = () => {

    const [email, setEmail] = useState<string | null>(null)

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const email = user.email;
            setEmail(email)
          } 
        });   
    },[])
    
  const user = auth.currentUser;

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate()

  const logOutHandler = () => {
    signOut(auth)
    .then( () => navigate("/"))
  }

  return (
    <Box sx={{ display: {xs:'flex', lg:'none'} }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            BookShare
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'My books', 'Borrowed', 'Shared'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {index===0 && 
                <NavLink 
                    className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/" end
                     >{text}
                </NavLink>
                }

                {index===1 && 
                <NavLink 
                    className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/mybooks" end
                     >{text}
                </NavLink>
                }

                {index===2 && 
                <NavLink 
                    className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/borrow" end
                     >{text}
                </NavLink>
                }

                {index===3 && 
                <NavLink 
                    className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/lend" end
                     >{text}
                </NavLink>
                }  
              </ListItemButton>
            </ListItem> 
          ))}
        </List>
        <Divider />
        {!email && 
        <List>
          
          {['Sign in', 'Sign up'].map((text, index) => (
            <ListItem key={text} disablePadding>
               
              <ListItemButton>
                {index === 0 && 
              <NavLink 
                className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                to="/signin" end
                 >{text}
             </NavLink>
                }

                {index === 1 && 
              <NavLink 
                className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                to="/signup" end
                 >{text}
             </NavLink>
                }
                
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        }

        {email && 
        <List>     
        {['Sign out'].map((text, index) => (
        <ListItem key={text} disablePadding>
            
            <ListItemButton>
            <button className='logout-button' onClick={logOutHandler}>Sign out</button>
            </ListItemButton>
        </ListItem>
        ))}
        </List>
        }

      </Drawer>
      {/* <Main open={open}> */}
        <DrawerHeader />
       
      {/* </Main> */}
    </Box>
  );
}