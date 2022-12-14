import { Avatar, Box, Button, Modal, Rating, Typography, CircularProgress } from "@mui/material";
import { Footer } from "../../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Borrow.style.css";
import { pink } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { BorrowModal } from '../../shared/Borrow/BorrowModal'
import { BorrowedBookCard } from "./BorrowedBookCard";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export const Borrow = () => {
  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true)
  const [information, setInformation] = useState([]);
  const [volumeIds, setVolumeIds] = useState<string[]>([]);
  const handleClose = () => setOpen(false);

  const user = auth.currentUser;
  const email = user?.email

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
    alignItems: "flex-start",
    gap: "20px",
    borderColor: "white",
    borderRadius: "6px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    outline: "0",
  };

  const getBorrowedBooks = async () => {
    const volumesList: string[] = [];
    const responseList: any = [];
    const information: any = [];
    const querySnapshot = await getDocs(collection(db, `users/${email}/borrowedBooks`));
    querySnapshot.forEach((doc) => {
      information.push(doc.data());
      volumesList.push(doc.data().volumeID)
    });
    setInformation(information);
    setVolumeIds(volumesList);

    const getApiData = async () => {
      for (let i = 0; i < volumesList.length; i++) {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumesList[i]}`)
        const data = await response.json();
        responseList.push(data.volumeInfo);
      }
      setShowLoader(false);
      setBookInfo(responseList);
      
    }
    getApiData();
  }

  useEffect(() => {
    getBorrowedBooks();
  }, [])

  return (
    <div className="borrow-page-container">
      <NavBar />
      <div className="main-content">
        <div className="borrowed-books">
          <h3>Books you have Borrowed</h3>
          <div className="borrowed-books-container">
          {showLoader&& (
          <CircularProgress size={100} sx={{margin: '0 auto'}}/>
        )}
        {bookInfo && (
        <>
          {bookInfo.map((data, number) => (
            <BorrowedBookCard key={number} data={data} information={information[number]} volumeIds={volumeIds}/>
        ))}
        </>
      )}
          </div>
          <div className="borrow-book-button">

            <BorrowModal/>
          
          </div>
        </div>
        <div className="main-section-bottom">
          <h3>You may also like:</h3>
          <div className="bottom-card-container">
            <div className="first-card-container">
              <div className="first-card-img">
                <img src="shantaram.jpg" alt="Shantaram" />
              </div>
              <div className="first-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={2.5} readOnly />
                  </div>
                  <div className="text">
                    “Really loved the ideas behind this book. I could identify
                    with it far more than I did with minimalism. If cosy is one
                    of your favourite words, this is the book for you!”{" "}
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: pink[500] }}>PR</Avatar>
                    </div>
                    <div className="username">Piotr R</div>
                  </div>
                </div>
                <div className="card-bottom-btn-section">
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    Borrow
                  </Button>
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    DETAILS
                  </Button>
                  <FavoriteIcon sx={{ color: "gray" }} />
                </div>
              </div>
            </div>
            <div className="second-card-container">
              <div className="second-card-img">
                <img src="harry.jpg" alt="Shantaram" />
              </div>
              <div className="second-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={2.5} readOnly />
                  </div>
                  <div className="text">
                    The elevation can be used to establish a hierarchy between
                    other content. In practical terms, the elevation controls
                    the size of the shadow applied to the surface. In dark mode,
                    raising the elevation also makes the surface lighter.{" "}
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: pink[500] }}>PR</Avatar>
                    </div>
                    <div className="username">Piotr R</div>
                  </div>
                </div>
                <div className="card-bottom-btn-section">
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    Borrow
                  </Button>
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    DETAILS
                  </Button>
                  <FavoriteIcon sx={{ color: "gray" }} />
                </div>
              </div>
            </div>
            <div className="third-card-container">
              <div className="third-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={2.5} readOnly />
                  </div>
                  <div className="text">
                    A science fiction/fantasy story about Paul Atreides, the boy
                    destined to be a ruler on Dune, a desert planet, and
                    populated by various tribes, and groups of people, who
                    either love him, or hate him.
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: pink[500] }}>PR</Avatar>
                    </div>
                    <div className="username">Piotr R</div>
                  </div>
                </div>
                <div className="card-bottom-btn-section">
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    Borrow
                  </Button>
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    DETAILS
                  </Button>
                  <FavoriteIcon sx={{ color: "gray" }} />
                </div>
              </div>
              <div className="third-card-img">
                <img src="king.jpg" alt="Shantaram" />
              </div>
            </div>
            <div className="forth-card-container">
              <div className="forth-card-img">
                <img src="jo.jpg" alt="Shantaram" />
              </div>
              <div className="forth-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={2.5} readOnly />
                  </div>
                  <div className="text">
                    The elevation can be used to establish a hierarchy between
                    other content. In practical terms, the elevation controls
                    the size of the shadow applied to the surface. In dark mode,
                    raising the elevation also makes the surface lighter.
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: pink[500] }}>PR</Avatar>
                    </div>
                    <div className="username">Piotr R</div>
                  </div>
                </div>
                <div className="card-bottom-btn-section">
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    Borrow
                  </Button>
                  <Button variant="text" sx={{ color: "#1976D2" }}>
                    DETAILS
                  </Button>
                  <FavoriteIcon sx={{ color: "gray" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="borrow-book-button">
            <Button variant="outlined" sx={{ width: "207px", height: "42px" }}>
              SHOW MORE BOOKS
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      <script
        src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
      ></script>
    </div>
  );
};
