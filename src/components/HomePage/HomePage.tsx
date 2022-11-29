import { useState } from "react";
import { Footer } from "../Footer/Footer";

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
            booksellers?
          </p>
          <p>Become a member of 30.000+ Bookshare community</p>
          <div className="search-inp">

          </div>
        </div>
        <div className="images"></div>
      </div>
      Hello Book
      <Footer />
    </div>
  );
};
