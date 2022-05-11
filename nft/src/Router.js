import React from "react";

import Header from "./components/header/JC_Header";
import Footer from "./components/footer/JC_Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JannabiClubMint from './pages/WJBZMint';
// import WhitelistMint from './pages/WJBZWhitelistMint';
import NotFound from "./pages/NotFound";
// import ScrollTopBehaviour from "./components/ScrollTopBehaviour";
import Main from './pages/Main';

function Router() {

  return (
    <> 
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* <ScrollTopBehaviour /> */}
      { (window.location.pathname.toLowerCase() !== '/mint')&&(window.location.pathname.toLowerCase() !== '/wlmint') ? <Header/> : null }
      <Routes>
        <Route exact path='/' element={<Main />}  />
        <Route exact path='/mint' element={<JannabiClubMint/>} />
        {/* <Route path='/jannabiclubmint' element={<JannabiClubMint/>} /> */}
        {/* <Route path='/wlmint' element={<WhitelistMint/>} /> */}
        {/* <Route path='/jannabiclubwlmint' element={<WhitelistMint/>} /> */}
        {/* <Route path='/randomMint' element={<RandomMint/>} /> */}
        {/* <Route path='/governance' element={<Governance/>} /> */}
        {/* <Route path='/governance/propose' element={<GovernancePost/>} /> */}
        {/* <Route path='/governance/:no' element={<GovernancePostView/>} /> */}
        {/* <Route path='/contest' element={<Contest/>} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      { (window.location.pathname.toLowerCase() !== '/mint')&&(window.location.pathname.toLowerCase() !== '/wlmint') ? <Footer/> : null }
    </BrowserRouter>
    </>
  );
}

export default Router;
