import { Button, CircularProgress, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

import { PersistentDrawerLeft } from "../NavBar/Drawer";

export const BooksAvailableToBorrow = () => {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [volumeIds, setVolumeIds] = useState<string[]>([]);
  const [booksInfo, setBooksInfo] = useState<object[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showLoader, setShowLoader] = useState(true)
  const [volumeMail, setVolumeMail] = useState({});
  const [information, setInformation] = useState([]);
  const [displayBook, setDisplayBook] = useState(true)



  const getBooksIds = async () => {
    const emails: string[] = [];
    const booksList: string[] = [];
    const volumeEmailObject: any = {}
    const information: any = [];
    const querySnapshot = await getDocs(collection(db, `users`));
    querySnapshot.forEach((doc) => {
      emails.push(doc.id);
    });
    // setEmails(emailList);
    for (let i = 0; i < emails.length; i++) {
      const querySnapshot2 = await getDocs(
        // collection(db, `users/${emails[i]}/ownedBooks`)
        query(collection(db, `users/${emails[i]}/ownedBooks`), where('isShared', '==', true))
      );
      querySnapshot2.forEach((doc) => {
        information.push(doc.data());
        booksList.push(doc.data().volumeID);
      });
      setVolumeIds(booksList);
      // volumeEmailObject[emails[i]] = booksList;
    }
    setVolumeMail(volumeEmailObject);
    setInformation(information);
    console.log(information)
    
    const getApiData = async () => {
      const responseList: any = [];
      for (let i = 0; i < volumeIds.length; i++) {
        const response = await fetch(

          `https://www.googleapis.com/books/v1/volumes/${booksList[i]}`

        );
        const data = await response.json();
        // data.volumeInfo['info'] = 'tekst';
        responseList.push(data);
        // setDisplayBook(current => !current )
      }
      setBooksInfo(responseList.sort());
    //   console.log(booksInfo)
      setShowLoader(false);
    };
    getApiData();
  };

  const buttonOnClick = () => {
    setIsClicked(true)
    console.log('click');
  }

  useEffect(() => {
    getBooksIds();
  }, [])

    return(
        <div>
            
            <PersistentDrawerLeft/>
            <NavBar/> 
            
            <h2>Books you can borrow</h2>  

            <div className="books-you-can-borrow-container">

            {booksInfo && (
        <>
          {booksInfo.map((data: any, number) => (
            console.log(data),
            <div key={number}>{data?.volumeInfo.title}</div>
        ))}
        </>
      )}

            </div>

        </div>
    ) 
}