import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import cover from '../../../images/Book2.jpeg'
import Typography from '@mui/material/Typography'
import { AsyncAutocompleteBooks } from './AsyncSelect'
import { CardMyBooksPage } from '../CardMyBooksPage/CardMyBooksPage'
import { useState } from 'react'
import '../MyBooksPage/BooksModal.style.css'
import { setDoc, collection, addDoc, doc, updateDoc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {db} from '../../../firebase' 


export const BooksModal = () => {

  const [open, setOpen] = useState(false)

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const addBookToMyLibrary = async () => {
      await setDoc(doc(db, `users/${email}/ownedBooks`, `${foundBook.volumeID}`), {
        volumeID: foundBook.volumeID, 
        isShared: false
        })
        handleClose()
      }
      

    const [foundBook, setFoundBook] = useState({
      volumeID: '',
      title: 'Title', 
      authors: ['Author'],
      // cover: cover,
      pickUpSpot: '', 
      isPublic: false
    }) 

    const style={
        width: '600px' ,
        height: 'fit-content', 
        bgcolor: 'white', 
        position: 'absolute', 
        top: '20%', 
        left: '30%', 
        padding: '20px'
    }

return (
<div className='books-modal-container'>
  <Fab sx={{
    position: 'fixed', 
    bottom: '250px', 
    right: '200px'
    }}
    variant="extended" color="primary" aria-label="add" onClick={handleOpen}>
    Add a new book
    <AddIcon sx={{ ml: 1 }} />
  </Fab>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
      mb: '20px'
    }}>
      Add a new book to your library
    </Typography>
    <AsyncAutocompleteBooks setFoundBook={setFoundBook}/>
    
    <div className='card-myBooksPage-container'>
    <CardMyBooksPage bookCover={cover} bookAuthor={foundBook.authors[0]} bookTitle={foundBook.title}/>
    </div>

    <Button 
      variant="contained" 
      startIcon={<AddIcon />}
      onClick={addBookToMyLibrary}>
        Add to my private library
    </Button>
  </Box>
</Modal>
</div>

)
}