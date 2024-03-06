import React, { useState,useEffect } from "react";
import './NavBar.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from "../Authentication/login";
import Signup from "../Authentication/signup";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import logo from '../../assets/logo.png';
export default function NavBar() {

  const [isOpen, setIsOpen] = useState(true);
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

       {/* ( */}
      <div style={{ display: "flex", justifyContent: "center", }}>
        <ul className="Navmenu" style={{ display: "flex", justifyContent: "center", listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "0 50px" }}>
            <Link to="/IPC-LookUp" style={{ textDecoration: "none", color: "#C2C266" }}>IPC LookUp</Link>
          </li>
          <li style={{ margin: "0 50px" }}>
            <Link to="/feature2" style={{ textDecoration: "none", color: "#C2C266" }}>Feature 2</Link>
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
        >
          Logout
        </Button>
      </div>
      {/* ) : (  */}




{/* 
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
        </div> */}





      {/* ) */}
    </header>
        </div>
    )
}