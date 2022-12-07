import * as React from 'react';
import { useEffect, useState } from 'react'
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

interface privateBooksInterface{

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

export default function BasicTabs({newBook}: any){
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const auth = getAuth()
  const user = auth.currentUser;
  const email = user?.email
  const [privateBooksIDs, setPrivateBooksIDs] = useState([''])  
  const [privateBooksDetails, setPrivateBooksDetails] = useState({}) 


  useEffect(()=> {
    getDocs(collection( db, `users/${email}/ownedBooks`))
    .then((querySnapshot) => {
        let privateBooksIDs: string[] = [];
        querySnapshot.docs.forEach((doc) => {
            let privateBookID = doc.id
            privateBooksIDs.push(privateBookID)
        })
        setPrivateBooksIDs(privateBooksIDs)
        console.log(privateBooksIDs)
    })
},[newBook])

// useEffect(() => {
//   const getBookDetails = () => {
//     let books: object[] = []
//     privateBooksIDs.forEach((privateBookID) => {
//       fetch(`https://www.googleapis.com/books/v1/volumes/${privateBookID}`)
//   .then((response) => {
//      return response.json()
//   })
//   .then((data) => {
//     console.log(data)
//        books.push({
//         value: data.id, 
//         title: data.volumeInfo.title,
//         subTitle: data.volumeInfo.subtitle,
//         authors: data.volumeInfo.authors
//         // cover: item.volumeInfo.imageLinks.thumbnail
//       })
//     })
//     .catch((error) => {
//         console.log(error);
//     })
//   })
//   setPrivateBooksDetails(books)
//   console.log(privateBooksDetails)
//   }
//   getBookDetails()
// },[])   
  

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
          <div className='private-books-container'>
            {privateBooksIDs && privateBooksIDs.map((id) => (

              <CardMyBooksPage bookCover={cover} bookTitle={id} bookAuthor={'milne'}/>
            ))}
          </div>

      </TabPanel>
      <TabPanel value={value} index={1}>
        Shared books collection
      </TabPanel>
    </Box>
  );
}