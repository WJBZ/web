import React, { useState, useEffect, useContext } from "react";
import Scrollspy from "react-scrollspy";
import caver from '../../klaytn/caver';
import Logo from "../../assets/logo2.svg"
import { Link } from "react-router-dom";
// import { UserInfoContextStore } from "../contexts/UserInfoContext";
import axios from 'axios';

// import {
//   FiHome,
//   FiUser,
//   FiSettings,
//   FiGrid,
//   FiCast,
//   FiPhoneOutgoing,
// } from "react-icons/fi";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [contract, setContract] = useState();

  // const UserInfo = useContext(UserInfoContextStore);
  
  useEffect(async () => {
    setNetworkInfo();
    await setContractInfo();
  }, []);

  useEffect(async () => {
    LoginInfo();
    // ResultRandomText();
    setNetworkInfo();
  }, [account, balance, network]);

  // const changeBackground = () => {
  //   if (window.scrollY >= 80) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  const toggleMenu = () => {
    setNavbar(navbar => !navbar);
  }

  async function setAccountInfo() {
    const { klaytn } = window;
  
    if (klaytn === undefined) return;

    const account = klaytn.selectedAddress;
    if(account===undefined) return;
    const balance = await caver.klay.getBalance(account);

    // UserInfo.setAddress(account);
    setAccount(account);
    setBalance(caver.utils.fromPeb(balance, 'KLAY'));
    
    const contract = new caver.kct.kip17(process.env.REACT_APP_JB_CONTRACT_ADDRESS);

    setTokenCount(await contract.balanceOf(klaytn.selectedAddress));

    // await axios.post(`https://api.${process.env.REACT_APP_PUBLICLINK}/randomMintingCB`).then((res) => { 
      
    // });
    
    // await new Promise((resolve, reject) => setTimeout(resolve, 3000)).then(handleResultClose);

    // if(Number(network) !== Number(process.env.REACT_APP_JC_NETWORK)) {
    //   setOpen(true);
    // }
    setIsLogin(true);
  }

  function setNetworkInfo() {
    const { klaytn } = window;

    if (klaytn === undefined) return;

    setNetwork(klaytn.networkVersion);
    klaytn.on('networkChanged', () => setNetworkInfo(klaytn.networkVersion));
    

    // if(Number(network) !== Number(process.env.REACT_APP_JC_NETWORK)) { //8217 1001
    //   setOpen(true);
    // }
  }

  async function onLoginBtn() {
    const { klaytn } = window;

    // console.log(mCount);

    if(!isLogin) {
       //loadAccountInfo Process
      if(klaytn) {
        try {
          await klaytn.enable();
          await setAccountInfo(klaytn);
          klaytn.on('accountsChanged', async () => { await setAccountInfo(klaytn)});
        } catch (error) {
          console.log(error);
          console.log('User denied account access');
        }
      } else {
        console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
      }
    }
  }

  const setContractInfo = async () => {
    setContract(new caver.contract([
      {
        "constant": true,
        "inputs": [],
        "name": "candidateJannabiCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "r",
            "type": "uint256"
          }
        ],
        "name": "elected",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "round",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "totalVotes",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "count",
            "type": "uint256"
          }
        ],
        "name": "setCandidateJannabiCount",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "interval",
            "type": "uint256"
          }
        ],
        "name": "setCandidateInterval",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "candidatesTitle",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "checkpointRound",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "r",
            "type": "uint256"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "candidateTitle",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "voteInterval",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "candidateInterval",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "r",
            "type": "uint256"
          }
        ],
        "name": "roundBlock",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "candidatesContext",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "r",
            "type": "uint256"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "candidate",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "jannabisAllowed",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "candidates",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_candidate",
            "type": "uint256"
          },
          {
            "name": "jannabis",
            "type": "address"
          },
          {
            "name": "jannabiIds",
            "type": "uint256[]"
          }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "r",
            "type": "uint256"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "candidateContext",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "jannabis",
            "type": "address"
          }
        ],
        "name": "allowJannabis",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "isOwner",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "interval",
            "type": "uint256"
          }
        ],
        "name": "setHolidayInterval",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "VOTE_PERIOD",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "toBet",
            "type": "string"
          },
          {
            "name": "context",
            "type": "string"
          },
          {
            "name": "jannabis",
            "type": "address"
          },
          {
            "name": "jannabiIds",
            "type": "uint256[]"
          }
        ],
        "name": "registerCandidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "r",
            "type": "uint256"
          }
        ],
        "name": "candidateCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "candidateRegister",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "checkpoint",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "holidayInterval",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "remains",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "votes",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "HOLIDAY_PERIOD",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "period",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "REGISTER_CANDIDATE_PERIOD",
        "outputs": [
          {
            "name": "",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "interval",
            "type": "uint256"
          }
        ],
        "name": "setVoteInterval",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "jannabiVoted",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "userVotes",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "jannabis",
            "type": "address"
          }
        ],
        "name": "disallowJannabis",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_checkpoint",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "register",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_candidate",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "slogan",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "jannabiIds",
            "type": "uint256[]"
          }
        ],
        "name": "RegisterCandidate",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "voter",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_candidate",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "jannabiIds",
            "type": "uint256[]"
          }
        ],
        "name": "Vote",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      }
    ], process.env.REACT_APP_JB_CONTRACT_ADDRESS, { gasPrice: '25000000000' }));
  }

  const LoginInfo = () => {
    
    return (
      <>
        {/* <div className="count">{tokenCount}</div> */}
        <div className='JC_Info'>
          {/* <span>ADDRESS: {UserInfo.address}</span><br/> */}
          <span>KLAY: {balance}</span><br/>
          <span>Network: {(Number(network) === 8217 ? 'Mainnet' : Number(network) === 0 ? 'Not Found !!' : 'Testnet')} </span>
        </div>
      </>
  )};

  // window.addEventListener("scroll", changeBackground);

  return (
    <>
      {/* TOPBAR  */}
      <header className="JB_Header">
      <div className="container"> {/* className={navbar ? "container animate" : "container"} */}
        <div className="JB_LongLogo">
          <Link to="/">
            <img src='img/logo/WJBZ-Logo_white.png'/>
          </Link>
        </div>
          
        <div className="pc">
          <div className="Menu-List">
              <Scrollspy
                className="menu"
                items={["story", "jannabi", "roadmap", "partner", "team", "faq"]}
                currentClassName="current"
                offset={-75}>
                  <li className="current">
                    <a href="#story">
                      <span className="first">STORY</span>
                    </a>
                  </li>
                  <li>
                    <a href="#jannabi">
                      <span className="first">JANNABI</span>
                    </a>
                  </li>
                  <li>
                    <a href="#roadmap">
                      <span className="first">ROADMAP</span>
                    </a>
                  </li>
                  <li style={{
                    display:'none',
                    }}>
                    <a href="#partner">
                      <span className="first">PARTNER</span>
                    </a>
                  </li>
                  <li>
                    <a href="#team">
                      <span className="first">TEAM</span>
                    </a>
                  </li>
                  <li>
                    <a href="#faq">
                      <span className="first">FAQ</span>
                    </a>
                  </li>
              </Scrollspy>
            </div>
        </div>
        <div className="mobile">
          <div className="Menu-Btn"><a onClick={()=>toggleMenu()}><img src="img/icon/menu_icon.png"/></a></div>
          <div className="Menu-List">
            <Scrollspy
              className={navbar ? "menu show-menu": "menu hide-menu"}
              items={["story", "jannabi", "roadmap", "partner", "team", "faq"]}
              currentClassName="current"
              offset={-75}>
                <li className="current">
                  <a href="#story">
                    <span className="first">STORY</span>
                  </a>
                </li>
                <li>
                  <a href="#jannabi">
                    <span className="first">JANNABI</span>
                  </a>
                </li>
                <li>
                  <a href="#roadmap">
                    <span className="first">ROADMAP</span>
                  </a>
                </li>
                <li style={{
                    display:'none',
                    }}>
                  <a href="#partner">
                    <span className="first">PARTNER</span>
                  </a>
                </li>
                <li>
                  <a href="#team">
                    <span className="first">TEAM</span>
                  </a>
                </li>
                <li>
                  <a href="#faq">
                    <span className="first">FAQ</span>
                  </a>
                </li>
                {/* <li>
                  <a href="https://themeforest.net/checkout/from_item/33910000?license=regular">
                    <span className="wrapper">
                      <span className="first">Buy Now</span>
                      <span className="second">Buy Now</span>
                    </span>
                  </a>
                </li> */}
            </Scrollspy>
          </div>
        </div>
          {/* <div className="JB_Login">
            { isLogin ? <LoginInfo/> : 
            <a href='#' onClick={onLoginBtn}>
              <span className="first">LOGIN</span>
            </a> }
          </div> */}
      </div>
      </header>
      {/* /TOPBAR */}

      {/* <div className="mobile-menu-wrapper">
        <Scrollspy
          className="mobile_menu-icon"
          items={["home", "about", "service", "portfolio", "news", "contact"]}
          currentClassName="current"
          offset={-65}
        >
          <li>
            <a href="#home">
              <FiHome />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#about">
              <FiUser />
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="#service">
              <FiSettings />
              <span>Serivce</span>
            </a>
          </li>
          <li>
            <a href="#portfolio">
              <FiGrid />
              <span>Portfolio</span>
            </a>
          </li>
          <li>
            <a href="#news">
              <FiCast />
              <span>News</span>
            </a>
          </li>
          <li>
            <a href="#contact">
              <FiPhoneOutgoing />
              <span>Contact</span>
            </a>
          </li>
        </Scrollspy>
      </div> */}
      {/* End mobile-menu */}
    </>
  );
};

export default Header;
