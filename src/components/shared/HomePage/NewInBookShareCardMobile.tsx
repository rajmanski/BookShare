import * as React from 'react';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions'
import CardActionArea from '@mui/material/CardActionArea'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase'

interface CardInterface{
    title: string;
    author: string;
    cover: string;
    volumeID: string;
    information: any;
    setDisplayBook: any;
    volumeIds: any;
}

export const NewInBookShareCardMobile:FC<CardInterface> = ({title, author, cover, volumeID, information, setDisplayBook, volumeIds}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const user = auth.currentUser;
  const email = user?.email

  const  addMonths = (date = new Date()) => {
    date.setMonth(date.getMonth() + 1);
    return date;
  }

  const addBookToBorrowed = async () => {
    let ownerEmail = '';
    
    for (let i = 0; i < information.length; i++) {
      if (information[i]['volumeID'] === volumeIds) {
        ownerEmail = information[i].email;
      } 
    }

    //Adding book to firebase borrowedBooks
    await setDoc(doc(db, `users/${email}/borrowedBooks`, `${volumeIds}`), {
      volumeID: volumeIds, 
      dateOfReturn: addMonths(),
      originalOwner: ownerEmail,
      })
    
    //Deleting book from owner
    await deleteDoc(doc(db, `/users/${ownerEmail}/ownedBooks/${volumeIds}`))

    //Seting book a book lended book by the owner
    await setDoc(doc(db, `users/${email}/lendBooks`, `${volumeIds}`), {
      volumeID: volumeIds, 
      dateOfReturn: addMonths(),
      Borrower: email,
      })
      // handleOpenPopup();
      setDisplayBook(current => !current);
      navigate('/borrow')
  }

  return (
    <Card sx={{ width: '90vw', display: {xs: 'flex', md:'none'} }}>

        <CardMedia
        component="img"
        sx={{ width: 70, padding: '10px' }}
        image={cover}
        alt="book cover"
      />
      <CardActionArea>
      <CardContent sx={{ width: '60%', padding: '10px', flex: '1 0 auto' }}
          onClick={() => (
            navigate(`/bookDetails/${volumeID}`))}>
          <Typography sx={{
            fontSize: '16px'
          }}component="div" variant="h5">
            {title}
          </Typography>
          <Typography sx={{
            fontSize: '14px'
          }}
           variant="subtitle1" color="text.secondary" component="div">
            {author}
          </Typography>
        </CardContent>
      <CardActions>
      <Button sx={{
            color: '#1976D2', 
            fontWeight: 400,
            textDecoration: 'toUpperCase', 
            position: 'absolute',
            bottom: 5, 
            right: 5
        }}
            size="small" 
            onClick={addBookToBorrowed}>
          BORROW
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}