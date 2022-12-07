import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Footer } from "../../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import "./HomePage.style.css";

export{}

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    width: "800px",
    height: "600px",
    position: "absolute",
    left: "calc(50% - 400px)",
    top: "15%",
    backgroundColor: "white",
    margin: "20px",
    padding: "20px",
    border: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    borderColor: "white",
    borderRadius: "6px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    outline: '0',
  };

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
      <NavBar />
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-data">
              <h5>Owner: Piotrek</h5>
              <h5>Avaliable from: 4 Dec 2022</h5>
              <h5>Pick-up spot: ul. Jana Pawła II 28/32</h5>
            </div>
            <div className="title-and-author">
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Shantaram
              </Typography>
              <h5>Gregory D. Roberts</h5>
            </div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "gray" }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
              aperiam fugiat illum, iste facere nesciunt nihil officiis earum
              ratione itaque, suscipit corporis inventore? Inventore maxime sit
              eum tenetur minus quidem adipisci dicta dolores! Earum, delectus.
              Possimus distinctio quis velit, sapiente, laudantium sequi amet,
              incidunt minima eum necessitatibus eius perspiciatis optio! Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. A aliquid sit
              obcaecati commodi, repudiandae sunt animi assumenda, placeat
              tempore dolores magni quia quisquam minus rerum! Ipsam, molestias.
              Omnis et nihil eos, vitae soluta nam deleniti saepe repellendus
              quia cum dolore amet tenetur delectus, dolorum inventore error
              totam eius, placeat ipsa!
            </Typography>
            <div className="raiting-and-button">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  gap: "550px",
                }}
              >
                <Rating name="simple-controlled" value={2} />
                <Button
                  sx={{
                    bgcolor: "#18a86e",
                    "&:hover": { backgroundColor: "#405d27" },
                  }}
                  variant="contained"
                >
                  Borrow
                </Button>
              </Box>
            </div>
          </Box>
        </Modal>
        <h1>New in Bookshare</h1>
        <div className="books-card-area">
          <div className="card-on-homepage" onClick={handleOpen}>
            <div className="img-card-wrapper">
              <img src="shantaram.jpg" alt="Shantaram" />
            </div>
            <div className="title-and-area">
              <h3>Shantaram</h3>
              <h4>Żoliborz</h4>
            </div>
            <div className="author">Gregory D. Roberts</div>
            <div className="buttons">
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                BORROW
              </Button>
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                DETAILS
              </Button>
              <FavoriteIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <div className="card-on-homepage">
            <div className="img-card-wrapper">
              <img src="shantaram.jpg" alt="Shantaram" />
            </div>
            <div className="title-and-area">
              <h3>Shantaram</h3>
              <h4>Żoliborz</h4>
            </div>
            <div className="author">Gregory D. Roberts</div>
            <div className="buttons">
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                BORROW
              </Button>
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                DETAILS
              </Button>
              <FavoriteIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <div className="card-on-homepage">
            <div className="img-card-wrapper">
              <img src="shantaram.jpg" alt="Shantaram" />
            </div>
            <div className="title-and-area">
              <h3>Shantaram</h3>
              <h4>Żoliborz</h4>
            </div>
            <div className="author">Gregory D. Roberts</div>
            <div className="buttons">
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                BORROW
              </Button>
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                DETAILS
              </Button>
              <FavoriteIcon sx={{ color: "gray" }} />
            </div>
          </div>
          <div className="card-on-homepage">
            <div className="img-card-wrapper">
              <img src="shantaram.jpg" alt="Shantaram" />
            </div>
            <div className="title-and-area">
              <h3>Shantaram</h3>
              <h4>Żoliborz</h4>
            </div>
            <div className="author">Gregory D. Roberts</div>
            <div className="buttons">
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                BORROW
              </Button>
              <Button variant="text" size="small" sx={{ color: "blue" }}>
                DETAILS
              </Button>
              <FavoriteIcon sx={{ color: "gray" }} />
            </div>
          </div>
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
