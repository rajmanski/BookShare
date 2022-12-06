import * as React from 'react';
import { useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { CardMyBooksPage } from '../../authorised/CardMyBooksPage/CardMyBooksPage';
import { SxProps, Theme } from '@mui/material/styles';
import cover from '../../../images/Book2.jpeg'
import { getDocs, collection, doc } from 'firebase/firestore';
import { db } from '../../../firebase'
import { getAuth } from 'firebase/auth'
import '../TabPanel/TabPanel.style.css'


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps<Theme>;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const auth = getAuth()
  const user = auth.currentUser;
  const email = user?.email
  const privateBooksIDs: string[] = []

  const getOwnedBooks = async () => {
  const querySnapshot = await getDocs(collection (db, `users/${email}/ownedBooks`))
  querySnapshot.forEach((doc) => {
    console.log(doc.id)
    privateBooksIDs.push(doc.id)
    console.log(privateBooksIDs)
  })}

  useEffect(() => {
    getOwnedBooks()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%', 
       }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="private" className='tab-private' {...a11yProps(0)}/>
          <Tab label="shared" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel sx={{
        p: 0
      }}
        value={value} 
        index={0}>
            {privateBooksIDs && privateBooksIDs.map((id) => (
              <div key={id} className='p'>{id}</div>
              // <CardMyBooksPage bookCover={cover} bookTitle={'halo'} bookAuthor={'milne'}/>
            ))}

      </TabPanel>
      <TabPanel value={value} index={1}>
        Shared books collection
      </TabPanel>
    </Box>
  );
}