import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { AsyncAutocompleteBooks } from './AsyncSelect'
import { CardMyBooksPage } from '../CardMyBooksPage/CardMyBooksPage'
import { useState, FC } from 'react'
import '../MyBooksPage/BooksModal.style.css'
import { setDoc, doc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {db} from '../../../firebase' 

interface BooksModalInterface{
  setNewBook: (value: string) => void;
  setSharedBook: (value: string) => void
}


export const BooksModal:FC<BooksModalInterface> = ({setNewBook, setSharedBook}) => {

  const [open, setOpen] = useState(false)

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [foundBook, setFoundBook] = useState({
    volumeID: '',
    title: 'Title', 
    authors: ['Author'],
    pickUpSpot: '', 
    isPublic: false, 
    cover: ''
    }) 

    const addBookToMyLibrary = async () => {
      await setDoc(doc(db, `users/${email}/ownedBooks`, `${foundBook.volumeID}`), {
        volumeID: foundBook.volumeID, 
        isShared: false
        })
        setNewBook(foundBook.volumeID) 
        handleClose()
      }
      

    const styleBigScreens={
      width: '600px' ,
      height: 'fit-content', 
      bgcolor: 'white', 
      position: 'absolute', 
      top: '20%', 
      left: '30%', 
      padding: '20px' 
    }

    const styleSmallScreens={
      width: '80vw' ,
      height: 'fit-content', 
      bgcolor: 'white', 
      margin: '30px auto',
      padding: '10px',
      display: {xs:'block', md:'none'},
  }

    let cover = 'nocover.png'

    if(foundBook.cover){
      cover = foundBook.cover
    }

return (
<div className='books-modal-container'>
  <Fab sx={{
    display: {xs: 'none', md: 'block'},
    position: 'fixed', 
    bottom: '250px', 
    right: '200px'
    }}
    variant="extended" color="primary" aria-label="add" onClick={handleOpen}>
    Add a new book
    <AddIcon sx={{ ml: 1 }} />
  </Fab>

  <Fab sx={{
    display: {xs: 'block', md: 'none'},
    position: 'fixed', 
    bottom: '140px', 
    right: '50px'
    }}
    variant="extended" color="primary" aria-label="add" onClick={handleOpen}>
    <AddIcon/>
  </Fab>

<Modal sx={{
  display: {xs:'none', md:'block'}
}}
  open={open}
  onClose={handleClose}
  aria-labelledby="add-a-new-book-to-library"
  aria-describedby="add-a-new-book-to-library"
>
  <Box sx={styleBigScreens}>
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
      mb: '20px'
    }}>
      Add a new book to your library
    </Typography>
    <AsyncAutocompleteBooks setFoundBook={setFoundBook}/>
    
    <div className='card-myBooksPage-container'>
      <CardMyBooksPage volumeID={foundBook.volumeID} bookCover={cover} bookAuthor={foundBook.authors[0]} bookTitle={foundBook.title} setSharedBook={setSharedBook}/>
    </div>

    <div className='add-to-library-button'>
      <Button 
        sx={{
          
        }}
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={addBookToMyLibrary}>
          Add to my private library
      </Button>
    </div>
  </Box>
</Modal>

<Modal sx={{
  display: {xs:'block', md:'none'}
}}
  open={open}
  onClose={handleClose}
  aria-labelledby="add-a-new-book-to-library"
  aria-describedby="add-a-new-book-to-library"
>
  <Box sx={styleSmallScreens}>
    <div className='close-button-container'> 
    <Button sx={{
      minWidth: '24px', 
      padding: '0px', 
      marginBottom: '10px'
    }}
    onClick={handleClose}>
      <CloseIcon sx={{
        color: 'rgb(101, 101, 101)'
      }}/>
    </Button>
    </div>
    <AsyncAutocompleteBooks setFoundBook={setFoundBook}/>
    
    <div className='card-myBooksPage-container'>
      <CardMyBooksPage volumeID={foundBook.volumeID} bookCover={cover} bookAuthor={foundBook.authors[0]} bookTitle={foundBook.title} setSharedBook={setSharedBook}/>
    </div>

    <div className='add-to-library-button'>
      <Button sx={{
        mb: '10px'
      }}
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={addBookToMyLibrary}>
          Add to library
      </Button>
    </div>
  </Box>
</Modal>

</div>
)
}