import React from "react";

import Header from "./components/header/JC_Header";
import Footer from "./components/footer/JC_Footer";
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import JannabiClubMint from './pages/WJBZMint';
// import WhitelistMint from './pages/WJBZWhitelistMint';
import NotFound from "./pages/NotFound";
// import ScrollTopBehaviour from "./components/ScrollTopBehaviour";
import Main from './pages/Main';

function Router() {
  return (
    <> 
    <BrowserRouter> {/* basename={process.env.PUBLIC_URL}> */}
      {/* <ScrollTopBehaviour /> */}
      { (window.location.href.toLowerCase().includes('#/mint'))||(window.location.href.toLowerCase().includes('#/wlmint')) ? null : <Header/> }
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
      { (window.location.href.toLowerCase().includes('#/mint'))||(window.location.href.toLowerCase().includes('#/wlmint')) ?  null : <Footer/>}
    </BrowserRouter>
    </>
  );
}

export default Router;
