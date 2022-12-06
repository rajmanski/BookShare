import { Avatar, Box, Button, Modal, Rating, Typography } from "@mui/material";
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

export const Borrow = () => {
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
    alignItems: "flex-start",
    gap: "20px",
    borderColor: "white",
    borderRadius: "6px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    outline: "0",
  };

  return (
    <div className="borrow-page-container">
      <NavBar />
      <div className="main-content">
        <div className="borrowed-books">
          <h3>Books you have Borrowed</h3>
          <div className="borrowed-books-container">
            <div className="borrowed-book-card">
              <div className="top-section">
                <div className="background">
                  <div className="img">
                    <img src="shantaram.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <div className="book-data">
                  <div className="title">Shantaram</div>
                  <div className="owner">Piotrek</div>
                  <div className="return-date">
                    Return by: <span>Sat 25 Nov</span>
                  </div>
                </div>
                <div className="borrowed-book-card-buttons">
                  <Button sx={{ color: "#1976D2" }}>Return</Button>
                  <Button sx={{ color: "#1976D2" }}>Prolong</Button>
                  <LocationOnOutlinedIcon
                    onClick={handleOpen}
                    sx={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="map-title">
                    <p>Pickup Spot: Frykasy-Rarytasy Wesoła</p>
                  </div>
                  <div className="map" id="map">
                    <MapContainer
                      className="map"
                      center={[ 52.23887604209378,21.009906761293422]}
                      zoom={13}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[52.23887604209378,21.009906761293422]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                        <Popup>
                          Pickup spot
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </Box>
              </Modal>
            </div>
            <div className="borrowed-book-card">
              <div className="top-section">
                <div className="background">
                  <div className="img">
                    <img src="shantaram.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <div className="book-data">
                  <div className="title">Shantaram</div>
                  <div className="owner">Piotrek</div>
                  <div className="return-date">
                    Return by: <span>Sat 25 Nov</span>
                  </div>
                </div>
                <div className="borrowed-book-card-buttons">
                  <Button sx={{ color: "#1976D2" }}>Return</Button>
                  <Button sx={{ color: "#1976D2" }}>Prolong</Button>
                  <LocationOnOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="borrowed-book-card">
              <div className="top-section">
                <div className="background">
                  <div className="img">
                    <img src="shantaram.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <div className="book-data">
                  <div className="title">Shantaram</div>
                  <div className="owner">Piotrek</div>
                  <div className="return-date">
                    Return by: <span>Sat 25 Nov</span>
                  </div>
                </div>
                <div className="borrowed-book-card-buttons">
                  <Button sx={{ color: "#1976D2" }}>Return</Button>
                  <Button sx={{ color: "#1976D2" }}>Prolong</Button>
                  <LocationOnOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="borrowed-book-card">
              <div className="top-section">
                <div className="background">
                  <div className="img">
                    <img src="shantaram.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <div className="book-data">
                  <div className="title">Shantaram</div>
                  <div className="owner">Piotrek</div>
                  <div className="return-date">
                    Return by: <span>Sat 25 Nov</span>
                  </div>
                </div>
                <div className="borrowed-book-card-buttons">
                  <Button sx={{ color: "#1976D2" }}>Return</Button>
                  <Button sx={{ color: "#1976D2" }}>Prolong</Button>
                  <LocationOnOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="borrowed-book-card">
              <div className="top-section">
                <div className="background">
                  <div className="img">
                    <img src="shantaram.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <div className="book-data">
                  <div className="title">Shantaram</div>
                  <div className="owner">Piotrek</div>
                  <div className="return-date">
                    Return by: <span>Sat 25 Nov</span>
                  </div>
                </div>
                <div className="borrowed-book-card-buttons">
                  <Button sx={{ color: "#1976D2" }}>Return</Button>
                  <Button sx={{ color: "#1976D2" }}>Prolong</Button>
                  <LocationOnOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="borrowed-book-card">
              <div className="top-section">
                <div className="background">
                  <div className="img">
                    <img src="shantaram.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <div className="book-data">
                  <div className="title">Shantaram</div>
                  <div className="owner">Piotrek</div>
                  <div className="return-date">
                    Return by: <span>Sat 25 Nov</span>
                  </div>
                </div>
                <div className="borrowed-book-card-buttons">
                  <Button sx={{ color: "#1976D2" }}>Return</Button>
                  <Button sx={{ color: "#1976D2" }}>Prolong</Button>
                  <LocationOnOutlinedIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="borrow-book-button">
            <Button variant="contained" sx={{ width: "207px", height: "42px" }}>
              BORROW A NEW BOOK
            </Button>
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
