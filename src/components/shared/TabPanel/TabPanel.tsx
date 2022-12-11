import * as React from 'react';
import { useEffect, useState, FC } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CardMyBooksPage } from '../../authorised/CardMyBooksPage/CardMyBooksPage';
import { SxProps, Theme } from '@mui/material/styles';
import cover from '../../../images/Book2.jpeg'
import { getDocs, collection} from 'firebase/firestore';
import { db } from '../../../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
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

interface BasicTabsInterfaceProps{
  newBook: string
}

export const BasicTabs:FC<BasicTabsInterfaceProps> = ({newBook}) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [email, setEmail] = useState<string | null>(null);

  const auth = getAuth()

  
  
  const [privateBooksIDs, setPrivateBooksIDs] = useState<null | string[]>(null)  
  const [privateBooksDetails, setPrivateBooksDetails] = useState({}) 


  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        console.log(user.email)
        setEmail(email)
        let privateBooksIDsArr: string[] = [];
        getDocs(collection( db, `users/${email}/ownedBooks`))
      .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
              let privateBookID = doc.id
              privateBooksIDsArr.push(privateBookID)
          })
          setPrivateBooksIDs(privateBooksIDsArr)
      })  
      } else {
      console.log('user is signed out')
      }
    });   
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
            {!privateBooksIDs && <div className='add-books-div'>Add books to your library to see them here</div>}
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