import { Avatar, Box, Button, Modal, Rating, Typography, CircularProgress } from "@mui/material";
import { Footer } from "../../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Borrow.style.css";
import { green, pink, red, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { BorrowModal } from '../../shared/Borrow/BorrowModal'
import { PersistentDrawerLeft } from "../NavBar/Drawer";
import { BorrowedBookCard } from "./BorrowedBookCard";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { BorrowedBookCardMobile } from "./BorrowedBookCardMobile";



export const Borrow = () => {
  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true)
  const [information, setInformation] = useState<any[]>([]);
  const [volumeIds, setVolumeIds] = useState<string[]>([]);
  const [displayBook, setDisplayBook] = useState(true)
  const [sharedBook, setSharedBook] = useState();
  const [showMore, setShowMore] = useState(false);
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
  // const getSharedBooks = async () => {
  //   const emails: string[] = [];
  //   const booksList: string[] = [];
  //   const volumeEmailObject: any = {}
  //   const information: any = [];
  //   const querySnapshot = await getDocs(collection(db, `users`));
  //   querySnapshot.forEach((doc) => {
  //     emails.push(doc.id);
  //   });
  //   // setEmails(emailList);
  //   for (let i = 0; i < 8; i++) {
  //     const querySnapshot2 = await getDocs(
  //       // collection(db, `users/${emails[i]}/ownedBooks`)
  //       query(collection(db, `users/${emails[i]}/ownedBooks`), where('isShared', '==', true))
  //     );
  //     querySnapshot2.forEach((doc) => {
  //       information.push(doc.data());
  //       booksList.push(doc.data().volumeID);
  //     });
  //   }
    
    
  //   const getApiData = async () => {
  //     const responseList: any = [];
  //     for (let i = 0; i < 8; i++) {
  //       const response = await fetch(

  //         `https://www.googleapis.com/books/v1/volumes/${booksList[i]}`

  //         // `https://www.googleapis.com/books/v1/volumes/${booksList[i]}?:keyes&key=AIzaSyB1TXi8S54_0RX2bok8fJn-OwDmBZCy6S8&maxResults=10`
  //         //key1: AIzaSyB1TXi8S54_0RX2bok8fJn-OwDmBZCy6S8
  //         //key2 : AIzaSyC3qM70tyz819Oy-fG929Z57AE6QtBBK3A
  //         //key3: AIzaSyDxOP0RY7OpFfbHIZHByQJDGV2Hfh9rV6o
  //       );
  //       const data = await response.json();
  //       // data.volumeInfo['info'] = 'tekst';
  //       responseList.push(data.volumeInfo);
  //     }
  //     setSharedBook(responseList);
  //   };
  //   getApiData();
  // };

  useEffect(() => {
    getBorrowedBooks();
    // getSharedBooks();
  }, [displayBook])

  
  return (
    <div>
      <PersistentDrawerLeft/>
      <NavBar />
      <div className="borrow-page-container">
      <div className="main-content">
        <div className="borrowed-books">
          <h3>Books you have borrowed</h3>
          <div className="borrowed-books-container">
          {showLoader&& (
          <CircularProgress size={100} sx={{margin: '0 auto'}}/>
        )}
        {bookInfo && (
        <>
          {bookInfo.map((data, number) => (
            <div>
            <BorrowedBookCard key={number} data={data} information={information[number]} volumeIds={volumeIds[number]} setDisplayBook={setDisplayBook}/>
            <BorrowedBookCardMobile key={number} data={data} information={information[number]} volumeIds={volumeIds[number]} setDisplayBook={setDisplayBook} />
            </div>
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
                      <Avatar sx={{ bgcolor: green[500] }}>AM</Avatar>
                    </div>
                    <div className="username">Anna M</div>
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
                    <Rating name="read-only" value={3.5} readOnly />
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
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                  <div className="text">
                    A science fiction/fantasy story about Paul Atreides, the boy
                    destined to be a ruler on Dune, a desert planet, and
                    populated by various tribes, and groups of people, who
                    either love him, or hate him.
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: yellow[500] }}>MJ</Avatar>
                    </div>
                    <div className="username">Marcin J</div>
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
                <img src="king.jpg" alt="King book picture"/>
              </div>
            </div>
            <div className="forth-card-container">
              <div className="forth-card-img">
                <img src="jo.jpg" alt="Jo book cover" />
              </div>
              <div className="forth-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                  <div className="text">
                    The elevation can be used to establish a hierarchy between
                    other content. In practical terms, the elevation controls
                    the size of the shadow applied to the surface. In dark mode,
                    raising the elevation also makes the surface lighter.
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: red[500] }}>KN</Avatar>
                    </div>
                    <div className="username">Karolina N</div>
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
            {showMore && (
              <>
                <div className="first-card-container">
              <div className="first-card-img">
                <img src="carriesoto is back.jpg" alt="Carie Soto is back book cover" />
              </div>
              <div className="first-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={4} readOnly />
                  </div>
                  <div className="text">
                    “The only other TJR novel I’ve read was one that thoroughly stunned me—DAISY JONES AND THE SIX. Reid captured the time period, the rock scene, and the characters with so much heart and authenticity that I was open and ready to read another of her works. But tennis? It wasn’t until I scanned some reviews that specifically stated that you don’t need to understand tennis to enjoy this book.”{" "}
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: green[500] }}>BH</Avatar>
                    </div>
                    <div className="username">Beatsy Van Horn</div>
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
                <img src="novel.jpg" alt="Novel book cover" />
              </div>
              <div className="second-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={2} readOnly />
                  </div>
                  <div className="text">
                  Demon Copperhead by Barbara Kingsolver is a long novel with strong messages, as are many of her books. Told from the perspective, and in the voice of, a boy named Demon Copperhead, the reader accompanies him from his birth to a single mother without a penny to her name.
.{" "}
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: pink[500] }}>BB</Avatar>
                    </div>
                    <div className="username">Bonnie Brodie</div>
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
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                  <div className="text">
                  Jonathan Freedland's book, "The Escape Artist," presents the story of Walter Rosenberg (who later changed his name to Rudolf Vrba), a teenaged Slovakian Jewish lad, who suffered the indignities inflicted by the Nazi governments that took over Hitler's annexed areas. At first. 
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: yellow[500] }}>MM</Avatar>
                    </div>
                    <div className="username">Mike Mismuke</div>
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
                <img src="escape.jpg" alt="The Escape Artist book cover"/>
              </div>
            </div>
            <div className="forth-card-container">
              <div className="forth-card-img">
                <img src="tomorrow.jpg" alt="Tomorrow book cover" />
              </div>
              <div className="forth-card-comment">
                <div className="top">
                  <div className="rating">
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                  <div className="text">
                  I loved everything about this book…
It’s adorable, sweet, sad, theatrical, character-collaborative-driven-in-spirit, artful, smart, emotional, intellectually rigorous, perceptive, and wonderful…
I could name a dozen more vertiginously exciting . . . vibrant words
to reflect the deep satisfying experience this novel is.
                  </div>
                  <div className="user-info">
                    <div className="avatar">
                      <Avatar sx={{ bgcolor: red[500] }}>MM</Avatar>
                    </div>
                    <div className="username">Mindi Mitchell</div>
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
              </>
            )}
          </div>
          {/* <div className="borrow-book-button">
            <Button variant="outlined" sx={{ width: "207px", height: "42px" }} onClick={() => setShowMore(true)}>
              SHOW MORE BOOKS
            </Button>
          </div> */}
        </div>
      </div>

      <Footer />
      <script
        src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
      ></script>
    </div>
    </div>
  );
};
