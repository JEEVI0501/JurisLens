import React, { useState,useEffect } from "react";
import './NavBar.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from "../Authentication/login";
import Signup from "../Authentication/signup";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import logo from '../../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
   const [accessToken, setAccessToken] = useState(null); 
  const location = useLocation();
  // const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);


useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'))
  }, []);


  const handleUsersIconClick = () => {
    setCurrentPage("/users");
    navigate("/users");
  };
  
  const handleLogout = () => {
    // setIsOpen(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  };
    return (
    <div>
    <header className="mainNavBar">
      <div className="logoDiv">
        <img
          src={logo}
          style={{ width: "150px",height: "50px" }}
          alt="JurisLens"
        />
      </div>

    {accessToken || localStorage.getItem('accessToken') ?  (
      <>
      <div style={{ display: "flex", justifyContent: "center", }}>
        <ul className="Navmenu" style={{ display: "flex", justifyContent: "center", listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "0 50px" }}>
            <Link to="/IPC-LookUp" style={{ textDecoration: "none", color: "#C2C266" }}>IPC LookUp</Link>
          </li>
          <li style={{ margin: "0 50px" }}>
            <Link to="/lens" style={{ textDecoration: "none", color: "#C2C266" }}>The Lens</Link>
          </li>
          <li style={{ margin: "0 50px" }}>
            <Link to="/sim-cases" style={{ textDecoration: "none", color: "#C2C266" }}>Case Match</Link>
          </li>
          <li style={{ margin: "0 50px" }}>
            <Link to="/analytics" style={{ textDecoration: "none", color: "#C2C266" }}>Analytics</Link>
          </li>
        </ul>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PeopleAltIcon 
          fontSize="large"
          style={{margin: "0 20px" ,cursor: "pointer",color:'linear-gradient(to right,#C2C266,#4e6c8d)' }}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className='grad'
          style={{margin: "0 40px"}}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      </>
      ) : ( 
       <div>
          <Link to="/login" className="no-underline">
            <Button
              variant="contained"
              // color="primary"
              size="small"
              // onClick={setIsOpen(true)}
              sx={{ marginRight: "20px",marginTop: "15px",backgroundColor:"#4e6c8d" }}
            >
              Login
            </Button>
          </Link>

          <Link to="/signup" className="no-underline">
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginRight: "20px" ,marginTop: "15px",backgroundColor:"#4e6c8d"}}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </header>
        </div>
    )
}