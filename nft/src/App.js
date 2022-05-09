import React, { useEffect } from 'react';
import Router from "./Router";
// import ScrollToTop from "./components/ScrollToTop";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import AOS from "aos";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      {/* <ScrollToTop /> */}
      <Router/>
    </>
  );
}

export default App;
