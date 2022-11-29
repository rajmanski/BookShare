import {Link} from 'react-router-dom'
import logo from '../../../images/logo.png'
import '../NavBar/NavBar.style.css'
export const NavBar = () => {

//   $(document).ready(function () {
//     var url = window.location;
//     $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
//     $('ul.nav a').filter(function() {
//          return this.href == url;
//     }).parent().addClass('active');
// });

    return (
<nav className="navbar navbar-expand-lg ">
  <div className="container-fluid ">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav nav-container">
        
        <div className='navigation-pages-links'>
          <img src={logo} alt="Logo" width="60" height="60" className="d-inline-block align-text-center logo"/>
          <Link className="nav-link" to="/" >Home</Link>
          <Link className="nav-link active" aria-current="page" to="/mybooks">Books</Link>
          <Link className="nav-link" to="/lend">Lend</Link>
          <Link className="nav-link" to="/borrow" >Borrow</Link>
        </div>
        <div className='signin-signup-links'>
          <Link className="nav-link" to="/signin">Sign in</Link>
          <Link className="nav-link" to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  </div>
</nav>
    )
}

