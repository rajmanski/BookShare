import { useFetch } from '../../useFetch'
import { useParams, useNavigate } from 'react-router-dom'
import { PersistentDrawerLeft } from "../NavBar/Drawer";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Typography, Rating, Button } from '@mui/material';
import '../BookDetailsMobile/BookDetailsMobile.style.css';
import { getAuth } from 'firebase/auth'
import { NavBar } from '../NavBar/NavBar';

export const BookDetailsMobile = () => {
    
    const {volumeID} = useParams();
    const {data: book, error, isLoading} = useFetch(`https://www.googleapis.com/books/v1/volumes/${volumeID}`)
    const [bookToDisplay, setBookToDisplay] = useState<DocumentData | null>(null)

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(()=> {
        setBookToDisplay(book)
    },[isLoading])

    return(
        <div>
            <NavBar/>
            <PersistentDrawerLeft/>

            {book && 
            <div className='book-details-mobile-container'> 

                {bookToDisplay?.volumeInfo.imageLinks && <div className='cover-background'><img src={bookToDisplay?.volumeInfo.imageLinks.thumbnail}></img></div>}
        
                <div className='book-details-mobile-title'>{bookToDisplay?.volumeInfo.title}</div>
                <div className='book-details-mobile-author'>{bookToDisplay?.volumeInfo.authors[0]}</div>

                {bookToDisplay?.volumeInfo.description && 
                    <div>{bookToDisplay?.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                }
                {!bookToDisplay?.volumeInfo.description && 
                    <div>Description is not available</div>
                }

                {bookToDisplay?.volumeInfo.averageRating && 
                <div className='book-details-mobile-rating'>
                <Typography component="legend">Rating</Typography>
                <Rating name="read-only" defaultValue={bookToDisplay?.volumeInfo.averageRating} readOnly />
                </div>
                }

                {user && 
                <Button variant='contained' sx={{
                    width: '150px',
                    alignSelf: 'flex-end', 
                    mt: '20px'
                }} 
                >Borrow
                </Button> 
                }

                {!user && 
                
                <Button variant='contained' sx={{
                    width: '200px',
                    alignSelf: 'flex-end',
                    mt: '20px'
                }} 
                    onClick={()=> navigate('/signin')}

                >Sign in to borrow
                </Button> 
                
                }
                   
            </div> 
            }
        </div>
    )
}