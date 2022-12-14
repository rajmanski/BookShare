import { useState } from 'react'
import {Footer} from '../../Footer/Footer'
import { NavBar } from '../../shared/NavBar/NavBar'
import { BasicTabs } from '../../shared/TabPanel/TabPanel'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import '../MyBooksPage/MyBooksPage.style.css'
import { useTheme } from '@mui/material/styles';
import { BooksModal } from '../MyBooksPage/BooksModal'


export const MyBooksPage = () => {

    // const theme = useTheme();
    const [newBook, setNewBook] = useState('')
    const [sharedBook, setSharedBook] = useState('')



    return(
    <>
    <NavBar/>
    <div className="my-books-page-container">
        <div className='title-and-search-container'>
            <div className='books-in-your-library-title'><h2>Books in your library</h2></div>
        </div>
        <BasicTabs newBook={newBook}/>
    </div>

    <BooksModal setNewBook={setNewBook} setSharedBook={setSharedBook}/>
    <Footer/>
    </>
    )
}