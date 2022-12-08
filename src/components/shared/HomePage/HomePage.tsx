import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import "./HomePage.style.css";
import { NewInBookshareCard } from "./NewInBookshareCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { async } from "@firebase/util";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [booksVolumesIds, setbooksVolumesIds] = useState<string[]>([]);
  const [booksInfo, setBooksInfo] = useState([]);
  const [isFetched, setIsFetched] = useState(false);


  const getBooks = async () => {
    const emailList: string[] = [];
    const booksList: string[] = [];
    const responseList:any = [];
    const querySnapshot = await getDocs(collection(db, `users`))
    querySnapshot.forEach((doc) => {
      emailList.push(doc.id);
  })
    setEmails(emailList);
    for (let i = 0; i < emails.length; i++) {
      const querySnapshot2 = await getDocs(collection(db, `users/${emails[i]}/ownedBooks`))
      querySnapshot2.forEach((doc) => {
        booksList.push(doc.data().volumeID);
      })
      setbooksVolumesIds(booksList)
    }
    for (let i = 0; i < 6; i++) {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${booksVolumesIds[i]}?:keyes&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=10`)
      const data = await response.json();
      responseList.push(data.volumeInfo);
    }
     setBooksInfo(responseList)
  }

  


  useEffect(() => {
    getBooks()
  }, [])
  
  
  

  return (
    <div className="home-page-container">
      <NavBar />
      {!booksVolumesIds  && (
        <div>Loading...</div>
      )}
      {booksVolumesIds && (booksVolumesIds.map((book, number) => (
        <>
          <div key={number}>{book}</div>
        </>
      )))}
      <div className="search-area">
        <div className="search">
          <h1>Share your books and be eco-friendly.</h1>
          <p>
            Not a fan of ebooks? Not enough space in your bookshelf to buy more
            books? Want to save some money and get access to the newest
            bestsellers?<br></br>
            Become a member of 30.000+ Bookshare community!
          </p>
          <div className="search-input">
            <TextField
              fullWidth
              id="fullWidth"
              placeholder="Search for a title of author"
              InputProps={{
                endAdornment: (
                  <Button
                    sx={{
                      bgcolor: "#18a86e",
                      "&:hover": { backgroundColor: "#405d27" },
                    }}
                    variant="contained"
                  >
                    Search
                  </Button>
                ),
              }}
            />
          </div>
        </div>
        <div className="images">
          <div className="img-wrapper">
            <img
              className="first-book"
              src="jo.jpg"
              alt="Jo Nesbo book cover"
            />
            <img
              className="second-book"
              src="king.jpg"
              alt="Stephen King book cover"
            />
            <img
              className="third-book"
              src="harry.jpg"
              alt="Harry Potter book cover"
            />
          </div>
        </div>
      </div>
      <div className="book-area">
        <h1>New in Bookshare</h1>
        <div className="books-card-area">
          <NewInBookshareCard />
          <NewInBookshareCard />
          <NewInBookshareCard />
          <NewInBookshareCard />
          <NewInBookshareCard />
          <NewInBookshareCard />
        </div>
        <div className="show-more-books-btn">
        <Button
          sx={{
            width: '192px',
            "&:hover": { backgroundColor: "#405d27" },
          }}
          variant="outlined"
        >
          SHOW MORE BOOKS
        </Button>
      </div>
      </div>
      <Footer />
    </div>
  );
};
