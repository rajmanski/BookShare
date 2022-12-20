import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { Footer } from "../../Footer/Footer"
import { PersistentDrawerLeft } from "../NavBar/Drawer";
import { NavBar } from "../NavBar/NavBar"
import './Lend.style.css';
import { LendCard } from "./LendCard";

export const Lend = () => {
    
    const [volumeID, setVolumeId] = useState<null | string[]>(null);
    const user = auth.currentUser;
    const email = user?.email

    const lendBookFetch = async () => {
        //Download data from lendBooks for currently logged user:
        const querySnapshot = await getDocs(collection(db, `users/${email}/lendBooks`));
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
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
            <h3>Books that you lent</h3>
            <div className="lent-card-section">
                <div className="lend-card"><LendCard/></div>
                <div className="lend-card"><LendCard/></div>
                <div className="lend-card"><LendCard/></div>
            </div>
          </div>
          <Footer />
        </div>
      );
    };
