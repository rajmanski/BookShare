import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Footer } from "../Footer/Footer";
import "./HomePage.style.css";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const displaySearches = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}:keyes&key=AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A&maxResults=40`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.items);
        setSearchedData(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="home-page-container">
      <div className="search-area">
        <div className="search">
          <h1>Share your books and be eco-friendly.</h1>
          <p>
            Not a fan of ebooks?Not enough spacein your bookshelf to buy more
            books? Want to save some money and get access to the newest
            booksellers?<br></br>
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
            <img className="first-book" src="jo.jpg" alt="Jo Nesbo book cover" />
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
      Hello Book
      <Footer />
    </div>
  );
};
