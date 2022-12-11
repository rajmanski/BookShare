import * as React from 'react';
import { useEffect, useState, FC } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardMyBooksPage } from '../../authorised/CardMyBooksPage/CardMyBooksPage';
import { SxProps, Theme } from '@mui/material/styles';
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
  volumeID: string;
  title: string;
  subTitle: string;
  authors: string[];
  cover?: string;
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
  newBook: string;
}

export const BasicTabs:FC<BasicTabsInterfaceProps> = ({newBook}) => {
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState<string | null>(null);

  const auth = getAuth()
  
  const [privateBooksIDs, setPrivateBooksIDs] = useState<string[]>([])
  const [sharedBooksIDs, setSharedBooksIDs] = useState<string[]>([])  
  const [privateBooksDetails, setPrivateBooksDetails] = useState<privateBooksInterface[] | null>(null) 
  const [sharedBooksDetails, setSharedBooksDetails] = useState<privateBooksInterface[] | null>(null) 
  const [sharedBook, setSharedBook] = useState('')


useEffect(() => {
  let privateBooksFromDBArr: object[] = []
  let privateBooksIDsArr: string[] = [];
  let sharedBooksIDsArr: string[] = [];


  onAuthStateChanged(auth, (user) => {
    if (user) {
      const email = user.email;
      setEmail(email)
      getDocs(collection( db, `users/${email}/ownedBooks`))
    .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
            let bookFromDB = doc.data()
            let bookID = doc.id
            if(bookFromDB.isShared == false){
              privateBooksIDsArr.push(bookID)
            }else{
              sharedBooksIDsArr.push(bookID)
            }
        })
        setPrivateBooksIDs(privateBooksIDsArr)
        setSharedBooksIDs(sharedBooksIDsArr)

    })  
    } else {
    console.log('user is signed out')
    }
  });   
},[newBook, sharedBook])

let privateBooksArr:privateBooksInterface[] = []

useEffect(() => {
  let urls = privateBooksIDs?.map ((privateBookID) =>`https://www.googleapis.com/books/v1/volumes/${privateBookID}`)
  const toRequest = url => fetch(url)
    .then((response) => {
      return response.json()
    })
  Promise.all(urls.map(toRequest))
 
    .then((data) => {
      console.log(data)
      data.forEach((book) => {
        if(book.volumeInfo.imageLinks){
          privateBooksArr.push({
            volumeID: book.id, 
            title: book.volumeInfo.title,
            subTitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            cover: book.volumeInfo.imageLinks.thumbnail
          })
        }else{
          privateBooksArr.push({
            volumeID: book.id, 
            title: book.volumeInfo.title,
            subTitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors
          })
        }
       
    })
    setPrivateBooksDetails(privateBooksArr)
    })
}, [privateBooksIDs])


let sharedBooksArr:privateBooksInterface[] = []


useEffect(() => {
  let urls = sharedBooksIDs?.map ((sharedBookID) =>`https://www.googleapis.com/books/v1/volumes/${sharedBookID}`)
  const toRequest = url => fetch(url)
    .then((response) => {
      return response.json()
    })
  Promise.all(urls.map(toRequest))
 
    .then((data) => {
      console.log(data)
      data.forEach((book) => {
        if(book.volumeInfo.imageLinks){
          sharedBooksArr.push({
            volumeID: book.id, 
            title: book.volumeInfo.title,
            subTitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            cover: book.volumeInfo.imageLinks.thumbnail
          })
        }else{
          sharedBooksArr.push({
            volumeID: book.id, 
            title: book.volumeInfo.title,
            subTitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors
          })
        }
       
    })
    setSharedBooksDetails(sharedBooksArr)
    })
}, [privateBooksIDs])

  
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
            {privateBooksDetails && privateBooksDetails.map((book) => (
              <CardMyBooksPage volumeID={book.volumeID} bookCover={book.cover} bookTitle={book.title} bookAuthor={book.authors[0]} setSharedBook={setSharedBook}/>
            ))}
          </div>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='private-books-container'>
          {!sharedBooksIDs && <div className='add-books-div'>Share books from your private library to see them here</div>}
          {sharedBooksDetails && sharedBooksDetails.map((book) => (
              <CardMyBooksPage volumeID={book.volumeID} bookCover={book.cover} bookTitle={book.title} bookAuthor={book.authors[0]} setSharedBook={setSharedBook}/>
          ))}
        </div>
      </TabPanel>
    </Box>
  );
}