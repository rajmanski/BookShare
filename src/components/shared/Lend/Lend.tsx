import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { Footer } from "../../Footer/Footer"
import { PersistentDrawerLeft } from "../NavBar/Drawer";
import { NavBar } from "../NavBar/NavBar"
import './Lend.style.css';
import { LendCard } from "./LendCard";
import { CircularProgress } from "@mui/material";

export const Lend = () => {

    const [booksInfo, setBooksInfo] = useState([]);
    const [dbData, setDbData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const user = auth.currentUser;
    const email = user?.email

    const lendBookFetch = async () => {
        const dataList: any = [];
        const responseList: any = [];
        //Download data from lendBooks for currently logged user:
        const querySnapshot = await getDocs(collection(db, `users/${email}/lendBooks`));
        querySnapshot.forEach((doc) => {
            dataList.push(doc.data());
        });
        setDbData(dataList);
        
        //Downloading data from API, because now we have got volumeIDs
        const getApiData = async () => {
            for (let i = 0; i < dataList.length; i++) {
              const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${dataList[i].volumeID}`)
              const data = await response.json();
              responseList.push(data.volumeInfo);
            }
            setBooksInfo(responseList)
            setShowLoader(false);
    }
    getApiData();
}

    useEffect(() => {
        lendBookFetch();
    }, [])

    return (
        <div className="lend-page-container">
          <div className="navbar-container">
            <PersistentDrawerLeft/>
            <NavBar />
          </div>
          <div className="main-lend-section">
            <h3>Books that you've lent</h3>
            <div className="lent-card-section">
                {showLoader&& (
                    <CircularProgress size={100} sx={{margin: '0 auto'}}/>
                 )}
                {booksInfo && (
                    <>
                        {booksInfo.map((data, number) => (
                    <div className="lend-card"><LendCard key={number} booksInfo={data} dbData={dbData[number]}/></div>
                ))}
                    </>
                )}
            </div>
          </div>
          <Footer />
        </div>
      );
}
