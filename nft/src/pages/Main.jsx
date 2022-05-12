import React, { useEffect } from "react";
import Slider from "react-slick";
import { Button, Accordion, AccordionSummary, AccordionDetails, Box, useMediaQuery, ToggleButton, ToggleButtonGroup, TextField, Link, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Player, { Track, PlayerInterface } from 'react-material-music-player';
import "./Main.scss";

function Main() {

    const slideSetting = {
        dots: true,
        infinite: true,
        arrows: false,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 500,
    };
    
    const slideSetting2 = {
        dots: false,
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow:7,
        autoplay: true,
        autoplaySpeed: 500,
        speed: 1000,
        
        responsive: [ // 반응형 웹 구현 옵션
                    {  
                        breakpoint: 1440, //화면 사이즈 1440px
                        settings: {
                            //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                            slidesToShow:7
                        } 
                    },
					{  
						breakpoint: 1260, //화면 사이즈 1260px
						settings: {
							//위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
							slidesToShow:5
						} 
					},
					{ 
						breakpoint: 768, //화면 사이즈 768px
						settings: {
							slidesToShow:3,
						} 
					}
				]
    }
    
    const baseURL = "img/slide";
    const baseURL2 = "img/NFT";

    PlayerInterface.play([
        new Track(
            "1",
            "img/NFT/8105.png",
            "Utopia",
            "ASHUTOSH",
            "mp3/Utopia_ASHUTOSH.mp3"
        )
    ]);

    PlayerInterface.playLater([
        new Track(
            "2",
            "img/NFT/9861.png",
            "Cool Screen Saver",
            "Pex",
            "mp3/Cool Screen Saver_Pex.mp3"
        )
    ]);

    PlayerInterface.playLater([
        new Track(
            "3",
            "img/NFT/7495.png",
            "CyberPunk",
            "Jiglr",
            "mp3/CyberPunk_Jiglr.mp3"
        )
    ]);

    useEffect(()=> {
        
    }, [])

    return (
    <>  
        {/*Player*/}
        {/* <div className="JB_Player">
            <audio loop controlsList="nodownload">
                <source src="mp3/Utopia_ASHUTOSH.mp3" type="audio/mpeg"/>
            </audio>
        </div> */}
        {/*Player end*/}
        <div className="JB_Container">
            {/* INTRO */}
            <div className="JB_Intro" id="intro">
                <div className="JB_MainTitle">
                    <img src="img/title/Title01.png"/>
                </div>
                <div className="JB_Champs">
                    <div className="JB_Wrapper">
                        <div className="JB_Champ" data-aos="fade-right" data-aos-duration="1200" data-aos-offset="10">
                            <img src="img/intro/7495.png"/>
                        </div>
                        <div className="JB_Champ" data-aos="fade-right" data-aos-duration="1200" data-aos-offset="10">
                            <img src="img/intro/5.png"/>
                        </div>
                        <div className="JB_Champ" data-aos="fade-right" data-aos-duration="1200" data-aos-offset="10">
                            <img src="img/intro/7996.png"/>
                        </div>
                        <div className="JB_Champ" data-aos="fade" data-aos-duration="1200" data-aos-offset="10">
                            <img src="img/logo/WJBZ_Circle.gif"/>
                        </div>
                        <div className="JB_Champ" data-aos="fade-left" data-aos-duration="1200" data-aos-offset="10">
                            <img src="img/intro/8105.png"/>
                        </div>
                        <div className="JB_Champ" data-aos="fade-left" data-aos-duration="1200" data-aos-offset="10">
                            <img src="img/intro/7222.png"/>
                        </div>
                        <div className="JB_Champ" data-aos="fade-left" data-aos-duration="1200" data-aos-offset="10">
                            <img src="img/intro/9861.png"/>
                        </div>
                    </div>
                </div>
            </div>
            
            
            {/* STORY */}
            <div className="JB_Story" id="story">
                <div className="JB_Title"><img src="img/title/Title02.png"/></div>

                <Slider className='JB_Slider' {...slideSetting}>
                    <div><img src={baseURL + "/WJBZ_Cartoon1.gif"}/></div>
                    <div><img src={baseURL + "/WJBZ_Cartoon2.gif"}/></div>
                    <div><img src={baseURL + "/WJBZ_Cartoon3.gif"}/></div>
                    <div><img src={baseURL + "/WJBZ_Cartoon4.gif"}/></div>
                </Slider>

            </div>

            {/* JANNABI NFT */}
            <div className="JB_Jannabi" id="jannabi" style={{
                backgroundImage: `url("img/NFT/NFT_bg.png")`, 
            }}>
                <div className="JB_Title JB_NFT"><img src="img/title/Title03.png"/></div>

                <Slider {...slideSetting2}>
                    <div><img src={baseURL2 + "/7495.png"}/></div>
                    <div><img src={baseURL2 + "/6915.png"}/></div>
                    <div><img src={baseURL2 + "/7300.png"}/></div>
                    <div><img src={baseURL2 + "/8008.png"}/></div>
                    <div><img src={baseURL2 + "/8105.png"}/></div>
                    <div><img src={baseURL2 + "/6279.png"}/></div>
                    <div><img src={baseURL2 + "/969.png"}/></div>
                    <div><img src={baseURL2 + "/7486.png"}/></div>
                    <div><img src={baseURL2 + "/8886.png"}/></div>
                    <div><img src={baseURL2 + "/8992.png"}/></div>
                    <div><img src={baseURL2 + "/6045.png"}/></div>
                    <div><img src={baseURL2 + "/9861.png"}/></div>
                    <div><img src={baseURL2 + "/5.png"}/></div>
                    <div><img src={baseURL2 + "/2.png"}/></div>
                    <div><img src={baseURL2 + "/3.png"}/></div>
                    <div><img src={baseURL2 + "/212.png"}/></div>
                    <div><img src={baseURL2 + "/8299.png"}/></div>
                    <div><img src={baseURL2 + "/2093.png"}/></div>
                    <div><img src={baseURL2 + "/6033.png"}/></div>
                </Slider>
                <Button className="Jannabi_Btn" variant="contained" href="https://opensea.io/collection/wjbz">OpenSea</Button>
                <Button className="Jannabi_Btn" variant="contained" href="https://wjbz.io/mint">Mint</Button>
            </div>

            {/* ROADMAP */}
            <div className="JB_Roadmap" id="roadmap" style={{
                backgroundImage: `url("img/roadmap/roadmap-bg.png")`, 
            }}>
                <div className="JB_Title"><img src="img/title/Title04.png"/></div>

                <div className="JB_Grid">
                    <div className="JB_GridBox">
                        <span>NO ROADMAP PROJECT</span>
                    </div>
                </div>
            </div>

            {/* TEAM */}
            <div className="JB_Team" id="team" style={{
                backgroundImage: `url("img/team/team_bg.png")`, 
            }}>
            <div className="JB_BG" style={{
                backgroundImage: `url("img/logo/WJBZ_Circle.gif")`, backgroundSize:'auto',
            }}>
                    <div className="JB_Black">
                        <div className="JB_Title"><img src="img/title/Title05.png"/></div>

                        <div className="JB_Grid">
                            <div className="JB_GridBox">
                                <div className="JB_CirclePhoto"><img src="img/team/1.png"/></div>
                                <div className="JB_Name">RYO</div>
                                <div className="JB_Job">CEO</div>
                            </div>
                            <div className="JB_GridBox">
                                <div className="JB_CirclePhoto"><img src="img/team/2.png"/></div>
                                <div className="JB_Name">HANANA</div>
                                <div className="JB_Job">Art</div>
                            </div>
                            <div className="JB_GridBox">
                                <div className="JB_CirclePhoto"><img src="img/team/4.png"/></div>
                                <div className="JB_Name">JJ SMITH</div>
                                <div className="JB_Job">Dev</div>
                            </div>
                            <div className="JB_GridBox">
                                <div className="JB_CirclePhoto"><img src="img/team/3.png"/></div>
                                <div className="JB_Name">JAPE</div>
                                <div className="JB_Job">Sub Art</div>
                            </div>
                            <div className="JB_GridBox">
                                <div className="JB_CirclePhoto"><img src="img/team/5.png"/></div>
                                <div className="JB_Name">Nabiz</div>
                                <div className="JB_Job">Manager</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PARTNER */}
            <div className="JB_Partner" id="partner" >
                <div className="JB_Title"><img src="img/title/Title06.png"/></div>

                <div className="JB_Grid">
                    <div className="JB_GridBox"></div>
                </div>
            </div>

            {/* FAQ */}
            <div className="JB_FAQ" id="faq" style={{
                backgroundImage: `url("img/faq/faq_bg.png")`, 
            }}>
                <div className="JB_Title"><img src="img/title/Title07.png"/></div>
                <div className="JB_Contents">
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            Q. 민팅 날짜와 가격은 어떻게 되나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            선착순 무료 민팅 - 5월 13일(금)<br/>
                            - 3,000개 (무료 민팅 + 가스피 별도)<br/>
                            * 오후 3시 : 커뮤니티 참여자 대상 민팅<br/>
                            <br/>
                            NFT 수집가 선별 소매넣기<br/>
                            - 6900개 (Airdrop)<br/>
                            * 기존 OG & WL 대상 확정 에어드랍<br/>
                            * NFT에 관심이 있는 SNS 이용자들 대상 선별하여 에어드랍 예정<br/>
                            <br/>
                            기부 민팅 - 추후 공지 Charity mint<br/>
                            - 100개 (10클레이)<br/>
                            * 시간 별도 공지 : 불우이웃 기부 민팅<br/>
                            * All proceeds will go to charity.<br/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 민팅은 어떤 지갑으로 진행할 수 있나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. WJBZ 프로젝트는 클레이튼 체인 기반의 NFT로 카이카스 지갑을 통해서만 민팅이 가능합니다!
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 레어리티는 언제 확인할 수 있나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. 레어리티는 별도로 공개하지 않습니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 로드맵은 어디서 확인하나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. WJBZ 프로젝트는 Non-Roadmap 프로젝트로 변경되었으며, 부담없이 자유로운 NFT 커뮤니티가 되고자합니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 잔나비를 보유한 홀더는 어떤 이점이 있나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. 보유중인 잔나비 NFT 캐릭터에 대한 저작권을 함께 소유하게 됩니다.
                        </AccordionDetails>
                    </Accordion>
                    <div className="Faq_ps"><strong>더 궁금한 내용이 있으신가요?</strong><br/>오픈채팅방 or 디스코드 채널을 통해 문의해 주시면 빠르고 친절하게 답변해드리겠습니다:)</div>
                </div>
            </div>
            <div className="JB_Player"><Player /></div>
        </div>
    </>
  );
};

export default Main;
