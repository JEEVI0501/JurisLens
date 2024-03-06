import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './Components/Authentication/login';
import SignUp from './Components/Authentication/signup';
import NavBar from './Components/Navbar/NavBar';
import Home from './Components/Home/Home';
import IPCLookUp from './Components/IPCLookUp/IPCLookUp';

const theme = createTheme({
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/IPC-LookUp" element={<IPCLookUp />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
