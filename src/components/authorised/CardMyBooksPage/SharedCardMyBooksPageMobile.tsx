import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../../firebase'
import { FC } from 'react'

interface CardMyBooksPageProps{
    volumeID: string;
    bookCover: string | undefined;
    bookTitle: string;
    bookAuthor: string;
    setSharedBook: any;
  } 


export const SharedCardMyBooksPageMobile:FC<CardMyBooksPageProps> = ({volumeID, bookCover, bookTitle, bookAuthor, setSharedBook}) => {

    const auth = getAuth()
    const email = auth.currentUser?.email
  
    const moveToPrivateBooks = async (volumeID: string) => {
      await updateDoc(doc(db, `users/${email}/ownedBooks`,`${volumeID}`), {isShared: false})
      setSharedBook(current => !current)
    }
  
    if (bookCover === undefined){
      bookCover = 'nocover.png'
    }

    return (
        <Card sx={{ width: '85vw', display: {xs: 'flex', md:'none'} }}>

            <CardMedia
            component="img"
            sx={{ width: 70, padding: '10px' }}
            image={bookCover}
            alt={bookTitle}
            />
            <CardActionArea>
            <CardContent sx={{ width: '70%', padding: '10px', flex: '1 0 auto' }}
            //  onClick={() => (
            //     navigate(`/bookDetails/${volumeID}`))} 
            >
            <Typography sx={{
                fontSize: '16px'
            }}component="div" variant="h5">
                {bookTitle}
            </Typography>
            <Typography sx={{
                fontSize: '14px'
            }}
            variant="subtitle1" color="text.secondary" component="div">
                {bookAuthor}
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
                onClick={() => moveToPrivateBooks(volumeID)}>
            STOP SHARING
            </Button>

            </CardActions>
            </CardActionArea>
            </Card>
    )
}

