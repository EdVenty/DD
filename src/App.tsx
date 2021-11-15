import logo from './logo.svg';
import './App.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import React from 'react';
import { Box, ImageList, Rating, Typography } from '@mui/material';
import NavBar from './NavBar';
import { Link, Route, Routes } from "react-router-dom";
import Main from './PageMain';
import News from './PageNews';
import Gallery from './PageGallery';
import Account from './PageAccount';
import { AuthNeededDialog } from './AuthNeededDialog';

function App() {
  const [drawerWidth, setDrawerWidth] = React.useState('55px');
  return (
    <div className="App">
      <NavBar setDrawerWidthCallback={setDrawerWidth}/>
      <AuthNeededDialog/>
      <Box sx={{display: 'flex', marginTop: '2rem', marginLeft: drawerWidth, transition: 'margin-left 0.3s'}}>
        <Routes>
          <Route path="/DD" element={<Main/>}/>
          <Route path="/DD/news" element={<News/>}/>
          <Route path="/DD/gallery" element={<Gallery/>}/>
          <Route path="/DD/account" element={<Account/>}/>
        </Routes>
      </Box>
      {/* <ImageList>
        <ImageListed/>
        <ImageListed/>
        <ImageListed/>
      </ImageList> */}
    </div>
  );
}

export default App;
