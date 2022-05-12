import React from "react";

const Footer = () => {
  return (
    <>
      <div className="JB_Footer">
      <div className="JB_Wrapper">
        <div className="JB_Logo"><img src="img/logo/WJBZ_Circle.gif"/></div>
        <a href="https://medium.com/@WJBZ.official" target="_Blank"><img src="img/footer/Medium_icon.png"/></a>
        <a href="https://twitter.com/WJBZ_Official" target="_Blank"><img src="img/footer/twitter_icon.png"/></a>
        <a href="#" target="_Blank"><img src="img/footer/opensea_icon.png"/></a>
        <a href="https://open.kakao.com/o/gJbN0jRd" target="_Blank"><img src="img/footer/kakao_icon.png"/></a>
        <a href="https://discord.com/invite/9fYN6zBgr3" target="_Blank"><img src="img/footer/discord_icon.png"/></a>
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} WJBZ<br/>
            Terms of Service.<br/>
          </p>
          <p>
            WJBZ@gmail.com
          </p>
        </div>
      </div>
        
      </div>
    </>
  );
};

export default Footer;