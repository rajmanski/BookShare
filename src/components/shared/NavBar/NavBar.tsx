import { signOut, onAuthStateChanged } from 'firebase/auth'
import { NavLink, useNavigate} from 'react-router-dom'
import { auth } from '../../../firebase'
import logo from '../../../images/logo.png'
import '../NavBar/NavBar.style.css'
import { useState, useEffect } from 'react'


export const NavBar = () => {

  const [email, setEmail] = useState<null| string>(null)

  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        setEmail(email)
      } else {
      console.log('user is signed out')
      }
    });   
},[])


  const user = auth.currentUser;
  const navigate = useNavigate()

  const logOutHandler = () => {
    signOut(auth)
    .then( () => navigate("/"))
  }

if(user) return (
  <nav className="navbar navbar-expand-md">
  <div className="container-fluid ">

   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"  aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav nav-container">
      
      <div className='navigation-pages-links'>
        <img src={logo} alt="Logo" className="d-inline-block align-text-center logo"/>
        
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
          >Borrow
        </NavLink>

        <NavLink 
          className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
          to="/lend" end
          >Share
        </NavLink>
        
      </div>

     <div className='signin-signup-signout-links'>
      <button className='logout-button' onClick={logOutHandler}>Sign out</button>
     </div>
    </div>
  </div>
</div>
</nav>
    )
    else return (
      
<nav className="navbar navbar-expand-lg">
    <div className="container-fluid ">

     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"  aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
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
            >Borrow
          </NavLink>

          <NavLink 
            className= {({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
            to="/lend" end
            >Share
          </NavLink>
          
        </div>

        <div className='signin-signup-signout-links'>

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


