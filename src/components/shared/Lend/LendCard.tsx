import './LendCard.style.css'

export const LendCard = ({booksInfo, dbData}) => {

  let image = booksInfo.imageLinks.thumbnail;

  if (image === undefined) {
    image = 'nocover.png'
  }

  if (booksInfo.title.length > 45) {
    booksInfo.title = booksInfo.title.slice(0, 45) + "...";
  }

//   if (booksInfo.volumeInfo?.description === undefined) {
//     booksInfo.volumeInfo.description = 'Description is not avaliable';
//   }

    return (
        <div className="card-on-lend">
             <div className="img-card-wrapper">
          <img src={image} alt={booksInfo.title}/>

        </div>
        <div className="title-and-area">
          <h3>{booksInfo.title}</h3>
          <h4>{dbData.city}</h4>
        </div>
        <div className="author">{booksInfo.authors[0]}</div>
        <div className="buttons">
          <p><span>Borrower:</span> {dbData.Borrower}</p>
          <p><span>Date of return:</span> {`${dbData.dateOfReturn.toDate().toDateString().split(" ")[1]}, ${dbData.dateOfReturn.toDate().toDateString().split(" ")[2]}, ${dbData.dateOfReturn.toDate().toDateString().split(" ")[3]}`}</p>
        </div>
        </div>
        
    )
}