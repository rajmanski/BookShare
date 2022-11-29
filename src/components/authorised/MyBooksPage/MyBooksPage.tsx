
import {Footer} from '../../Footer/Footer'
import { NavBar } from '../../shared/NavBar/NavBar'
import BasicTabs from '../../shared/TabPanel/TabPanel'

export const MyBooksPage = () => {

    return(
    <div className="my-books-page-container">
        <NavBar/>
        <h2 className='books-in-your-library-title'>Books in your library</h2>
        <BasicTabs/>

        <Footer/>
    </div>
    )
}