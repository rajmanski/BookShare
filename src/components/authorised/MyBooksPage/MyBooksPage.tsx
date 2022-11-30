
import {Footer} from '../../Footer/Footer'
import { NavBar } from '../../shared/NavBar/NavBar'
import BasicTabs from '../../shared/TabPanel/TabPanel'
import '../MyBooksPage/MyBooksPage.style.css'

export const MyBooksPage = () => {

    return(
    <>
    <NavBar/>
    <div className="my-books-page-container">
        <h2 className='books-in-your-library-title'>Books in your library</h2>
        <BasicTabs/>

    </div>
    <Footer/>
    </>
    )
}