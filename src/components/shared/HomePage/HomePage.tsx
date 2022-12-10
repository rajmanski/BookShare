import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import "./HomePage.style.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { NewInBookshareCard } from "./NewInBookshareCard";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [booksInfo, setBooksInfo] = useState<any>([]);
  const [isClicked, setIsClicked] = useState(false);

  const getBooksIds = async () => {
    const emails: string[] = [];
    const booksList: string[] = [];
    const querySnapshot = await getDocs(collection(db, `users`));
    querySnapshot.forEach((doc) => {
      emails.push(doc.id);
    });
    // setEmails(emailList);
    for (let i = 0; i < emails.length; i++) {
      const querySnapshot2 = await getDocs(
        collection(db, `users/${emails[i]}/ownedBooks`)
      );
      querySnapshot2.forEach((doc) => {
        booksList.push(doc.data().volumeID);
      });
    }

    const getApiData = async () => {
      const responseList: any = [];
      for (let i = 0; i < 12; i++) {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${booksList[i]}?:keyes&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=10`
        );
        const data = await response.json();
        responseList.push(data.volumeInfo);
      }
      console.log(responseList);
      setBooksInfo(responseList);
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

  return (
    <div className="home-page-container">
      <div className="navbar-container">
        <NavBar />
      </div>
      {booksInfo && (
        <>
          {booksInfo[0]?.title}
        </>
      )}
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
              placeholder="Search for a title or an author"
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
        <h1 className="new-in-bookshare-title">New in Bookshare</h1>
        <div className="books-card-area">
        {booksInfo && (
        <>
          {booksInfo.slice(0, 6).map((data, number) => (
            <NewInBookshareCard key={number}data={data}/>
        ))}
        </>
      )}
      {isClicked && (
        <>
          {booksInfo.slice(6, 9).map((data, number) => (
            <NewInBookshareCard key={number}data={data}/>
        ))}
        </>
      )}
          
          
        </div>
        <div className="show-more-books-btn">
          <Button
            sx={{
              width: "192px",
              "&:hover": { backgroundColor: "#405d27" },
            }}
            variant="outlined"
            onClick={buttonOnClick}
          >
            SHOW MORE BOOKS
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
