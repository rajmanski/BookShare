
import {Footer} from '../../Footer/Footer'
import { NavBar } from '../../shared/NavBar/NavBar'
import BasicTabs from '../../shared/TabPanel/TabPanel'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import '../MyBooksPage/MyBooksPage.style.css'

export const MyBooksPage = () => {

    return(
    <>
    <NavBar/>
    <div className="my-books-page-container">
        <h2 className='books-in-your-library-title'>Books in your library</h2>
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
    <Footer/>
    </>
    )
}