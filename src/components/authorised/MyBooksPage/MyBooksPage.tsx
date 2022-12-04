
import {Footer} from '../../Footer/Footer'
import { NavBar } from '../../shared/NavBar/NavBar'
import BasicTabs from '../../shared/TabPanel/TabPanel'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import '../MyBooksPage/MyBooksPage.style.css'
import {ApiDownloaderTitle} from './ApiDownloaderTitle'
import { useTheme } from '@mui/material/styles';
import { BooksModal } from '../MyBooksPage/BooksModal'

export const MyBooksPage = () => {

    const theme = useTheme();

    return(
    <>
    <NavBar/>
    <div className="my-books-page-container">
        <div className='title-and-search-container'>
            <div className='books-in-your-library-title'><h2>Books in your library</h2></div>
            {/* <ApiDownloaderTitle/> */}
        </div>
        <BasicTabs/>

        <Fab sx={{
            position: 'fixed', 
            bottom: '250px', 
            right: '200px'
        }}
        variant="extended" color="primary" aria-label="add">
        Add a new book
        <AddIcon sx={{ ml: 1 }} />
        </Fab>
    </div>

    <BooksModal/>
    <Footer/>
    </>
    )
}