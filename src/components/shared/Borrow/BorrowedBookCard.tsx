import {  Box, Button, Modal, Rating, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "./Borrow.style.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'



export const BorrowedBookCard = () => {

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
    )
}