import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { useState, FC } from 'react'
// import { setDoc, doc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {db} from '../../../firebase' 
import { AsyncSelectBorrow } from '../../shared/Borrow/AsyncSelectBorrow'
import {doc, setDoc} from 'firebase/firestore'

interface BorrowModalInterface{
 
}


export const BorrowModal = () => {

  const [open, setOpen] = useState(false)

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const addToBorrowed = async () => {
      // await setDoc(doc(db, `users/${email}/borrowedBooks`, `${foundBook.volumeID}`), {
      //   volumeID: foundBook.volumeID, 
      //   isShared: false
      //   })
        // setNewBook(foundBook.volumeID) 
        console.log('Dodane')
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
  <Button sx={{

    }}
    variant="contained" color="primary" aria-label="add" onClick={handleOpen}>
    Borrow a new book
    <AddIcon sx={{ ml: 1 }} />
  </Button>
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
    Find a book to borrow from other user    
    </Typography>
    <AsyncSelectBorrow setFoundBook={setFoundBook}/>
    
    

    <div className='add-to-library-button'>
      <Button 
        sx={{
          marginTop: '10px'
        }}
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={addToBorrowed}>
        Borrow      
        </Button>
    </div>
  </Box>
</Modal>
</div>

)
}