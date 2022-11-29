
import {Footer} from '../../Footer/Footer'
import BasicTabs from '../../shared/TabPanel/TabPanel'

export const MyBooksPage = () => {

    return(
    <div className="my-books-page-container">
        <h2 className='books-in-your-library-title'>Books in your library</h2>
        <BasicTabs/>

        <Footer/>
    </div>
    )
}