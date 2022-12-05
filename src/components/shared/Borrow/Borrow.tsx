import { Button } from '@mui/material';
import { Footer } from '../../Footer/Footer';
import { NavBar } from '../NavBar/NavBar';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import './Borrow.style.css';

export const Borrow = () => {
    return (
        <div className="borrow-page-container">
            <NavBar/>
            <div className="main-content">
                <div className="borrowed-books">
                    <h3>Books you have Borrowed</h3>
                    <div className="borrowed-books-container">
                        <div className="borrowed-book-card">
                            <div className="top-section">
                                <div className="img"></div>
                            </div>
                            <div className="bottom-section">
                                <div className="book-data">
                                    <div className="title">Shantaram</div>
                                    <div className="owner">Piotrek</div>
                                    <div className="return-date">Return by: Sat 25 Nov</div>
                                </div>
                                <div className="buttons">
                                    <Button sx={{color: '#1976D2'}}>Return</Button>
                                    <Button sx={{color: '#1976D2'}}>Prolong</Button>
                                    <LocationOnOutlinedIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}