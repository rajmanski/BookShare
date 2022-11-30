import {NavLink} from 'react-router-dom'
import logo from '../../../images/logo.png'
import '../NavBar/NavBar.style.css'


export const NavBar = () => {


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
          
          <NavLink 
            className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
            to="/" end
            >Home
          </NavLink>

          <NavLink 
            className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
            to="/mybooks" end
            >My books
          </NavLink>

          <NavLink 
            className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
            to="/borrow" end
            >Get book
          </NavLink>

          <NavLink 
            className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
            to="/lend" end
            >Share book
          </NavLink>
          
        </div>

        <div className='signin-signup-links'>

          <NavLink 
            className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
            to="/signin" end
            >Sign in
          </NavLink>

          <NavLink 
            className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
            to="/signup" end
            >Sign up
          </NavLink>
          
        </div>
      </div>
    </div>
  </div>
</nav>
    )
}

