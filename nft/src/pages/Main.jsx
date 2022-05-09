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
                        <span>더 넓은 세상에<br/>잔나비 알리기📢</span>
                        <span>WJBZ의 힘세고 강한 커뮤니티를 널리 알리기 위해 유동인구가 많은 지역에서 오프라인 광고를 집행합니다!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>밈 투자 아이디어<br/>콘테스트 오픈💎</span>
                        <span>첫 번째, WJBZ 콘테스트!<br/>직접하기 무서웠던 나만의 저세상 밈 투자 아이디어를 실현해봅시다!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>밈(Meme) 창작<br/>콘테스트 오픈💩</span>
                        <span>두 번째, WJBZ 콘테스트!<br/>WJBZ 커뮤니티를 더욱 유쾌하게 만들어 줄 밈 창작 콘테스트!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>P2E 로켓 부품<br/>NFT 에어드랍🚀</span>
                        <span>P2E 게임에서 사용되는 로켓!<br/>민팅 완료 후 12마리 이상 NABI를 보유한 홀더 대상에게 지급!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>세계관 공유<br/>파트너십 체결🤝</span>
                        <span>"Apes together strong!"<br/>모든 유인원 NFT 프로젝트 팀에게 파트너십 체결을 제안합니다!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>WJBZ 굿즈<br/>제작 및 판매</span>
                        <span>유니크하고 센스있는 패션 굿즈를 제작하여<br/>열심히 활동하는 WJBZ 홀더들에게 사전 지급 예정!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>WJBZ V2 PFP<br/>NFT 에어드랍✌</span>
                        <span>WJBZ v2 (PFP) 아트웍을 잔나비 보유량 1:1 비율로  에어드랍 합니다!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>방치형 P2E<br/>게임 PV 공개📺</span>
                        <span>WJBZ 세계관이 담긴 P2E 게임 프로모션 영상 최초공개!</span>
                    </div>
                    <div className="JB_GridBox">
                    <span>WJBZ 비밀벙커<br/>페이지 오픈🎮</span>
                        <span>오직 잔나비 홀더만 접근가능한 Private 커뮤니티 페이지 오픈!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>토크노믹스<br/>사전공개🍌</span>
                        <span>거버넌스 기반 토크노믹스 공개!<br/>확정된 토크노믹스를 기반으로 WJBZ P2E 생태계 구성 예정!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>방치형 P2E<br/>오픈🎮</span>
                        <span>잔나비와 우주선 NFT를 활용한 P2E 게임 프로젝트 오픈!</span>
                    </div>
                    <div className="JB_GridBox">
                        <span>상세 로드맵<br/>추가예정🐵</span>
                        <span>로드맵은 계속해서 추가됩니다!</span>
                    </div>
                </div>
                <div className="JC_DetailBtn"><a href="https://medium.com/@WJBZ.official/wjbz-project-roadmap-13ba6e674932" target="_Blank">상세 로드맵 &gt;</a></div>
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
                                <div className="JB_Name">Nabizz</div>
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
                            1차 민팅 - 5월 5일(목) Pre Sale<br/>
                            - 2,000개 (40클레이)<br/>
                            * 오후 9시:  화이트리스트 대상 민팅<br/>
                            * 오후 9시 30분 : 남은 수량 Public Sale<br/>
                            <br/>
                            2차 민팅 - 5월 6일(금) Public Sale<br/>
                            - 3,000개 (50클레이)<br/>
                            * 오후 9시<br/>
                            * 다음날까지 남는 수량 이월<br/>
                            <br/>
                            3차 민팅 - 5월 7일(토) Public Sale<br/>
                            - 4,000개 (50클레이)<br/>
                            * 오후 9시<br/>
                            * 다음날까지 남는 수량 +5클레이 인상.<br/>
                            <br/>
                            잔나비클럽 팀 물량<br/>
                            - 1000개<br/>
                            *홀더 대상 이벤트, 에어드랍 예정.
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
                            A. 잔나비클럽은 클레이튼 체인 기반의 NFT로 카이카스 지갑을 통해서만 민팅이 가능합니다!
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
                            A. 민팅이 모두 완료된 후 홈페이지를 통해 공개될 예정입니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 잔나비를 다수 보유한 홀더에게 어떤 해택이 있나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. 기본적으로 콘테스트 이벤트 등에서 더 많은 영향력을 행사할 수 있습니다.<br/>또 잔나비 00마리 이상 보유한 홀더분들에게는 추후 개발되는 P2E게임을 위한 한정 수량의 우주선 NFT를 에어드랍 해드릴 예정입니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. P2E 게임은 언제 오픈하나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. WJBZ의 세계관을 그려낸 방치형 P2E 게임은 7월중을 목표로 오픈될 예정입니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 콘테스트에 대해 알려주세요!
                        </AccordionSummary>
                        <AccordionDetails>
                            A. WJBZ 프로젝트는 P2E 이외에 NFT를 활용한 다양한 즐길거리를 만들어가고자 합니다.<br/>준비중인 콘테스트는 현재 2가지 이며 추후 새로운 콘테스트가 추가될 예정입니다!<br/><br/>더 자세한 콘테스트 내용은 미디엄 블로그를 확인해주세요!
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 잔나비 NFT로 채굴이 되나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. 방치형 P2E 게임을 통해서 토큰 채굴이 가능합니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 잔나비 NFT는 레어리티에 따른 차이가 있나요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. 잔나비 NFT의 경우 채굴량은 모두 동일할 예정입니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            Q. 우주선 NFT는 무엇인가요?
                        </AccordionSummary>
                        <AccordionDetails>
                            A. P2E 게임 스토리상 바나나 재배가 불가능해진 지구와 바나나팜 행성을 오갈 수 있는 중요한 이동 수단입니다.<br/>우주선을 직접 소유하여 바나나를 재배 하거나 타인의 우주선에 수수료를 지급하여 탑승할 수 있습니다.
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
