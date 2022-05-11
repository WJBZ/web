import React, { useState, useEffect, useCallback, useRef } from 'react';
import caver from '../klaytn/caver';
import JB_ContractABI from "../klaytn/abiInterface.json"; 
import './WJBZMint.scss';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Box, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
// import Modal from "react-modal";

function WJBZMint() {
  const [account, setAccount] = useState('');
  let [balance, setBalance] = useState(0);
  let [mintCount, setMintCount] = useState(1);
  let [network, setNetwork] = useState(null);
  let [contract, setContract] = useState();
  const [showInfo, setShowInfo] = useState(false);
  let [blockNumber, setBlockNumber] = useState(0);
  let [mintStartBlockNumber, setMintStartBlockNumber] = useState(0);
  let [mintPrice, setMintPrice] = useState(0);
  let [maxMintCount, setMaxMintCount] = useState(0);
  let [nowMintCount, setNowMintCount] = useState(0);
  let [limitCountPerBlock, setLimitCountPerBlock] = useState(1);
  let [maxValue, setMaxValue] = useState(1);
  const [, updateState] = useState(); 
  const [open, setOpen] = useState(false);
  let [isProgress, setIsProgress] = useState(false);
  const forceUpdate = useCallback(() => updateState({}), []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const countInput = useRef();

  useEffect(async() => {
    setNetworkInfo();
    await setContractInfo();
  }, []);

  useEffect(async () => {
    setNetworkInfo();
    await setAccountInfo();
  }, [account, balance, network]);

  useEffect(() => {
    const id = setInterval(async() => {
      const num = Number(caver.utils.hexToNumber(await caver.klay.getBlockNumber()));
      // console.log(num);
      setBlockNumber(num);
    }, 1000);
    return (() => clearInterval(id))
  }, []);
  
  useEffect(() => {
    const id2 = setInterval(async() => {
      if(contract===undefined) {
        const _c =  new caver.klay.Contract(JB_ContractABI, `${process.env.REACT_APP_JB_CONTRACT_ADDRESS}`, { gasPrice: '20000000000' });
        contract =_c;
        setContract(contract);
      }
      // console.log(contract);
      await contract.call("mintingInformation").then(res => {
        const _nowMintCount = Number(res[1])-1;
        setNowMintCount(_nowMintCount);
        setLimitCountPerBlock(Number(res[2]));  // 2 - Mint, 3 - WLMint
        setMaxValue(Math.min(Number(res[2]),Number(res[6])-Number(_nowMintCount)));
        setMintStartBlockNumber(Number(res[5]));
        setMaxMintCount(Number(res[6]));
        setMintPrice(caver.utils.fromPeb(res[7], 'KLAY'));
      });
    }, 10000);
    return (() => clearInterval(id2))
  }, []);


  const clampNumber = (num, min, max) => Math.min(Math.max(num, min), max);

  const randomRange = ((n1, n2) => {
    return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
  });

  function onChangeAmount(isUp) {
    if(isUp) {
      // console.log(mintCount);
      
      const _value = clampNumber(Number(mintCount)+1, 1, maxValue);
      setMintCount(_value);
      countInput.current.value = _value;
    } else {
      const _value = clampNumber(Number(mintCount)-1, 1, maxValue)
      setMintCount(_value);
      countInput.current.value = _value;
    } 
  }

  async function onMintBtn() {
    const { klaytn } = window;

    // console.log(mCount);

    if(!showInfo) {
       //loadAccountInfo Process
      if(klaytn) {
        try {
          await klaytn.enable();
          await setAccountInfo(klaytn);
          klaytn.on('accountsChanged', async () => await setAccountInfo(klaytn));
        } catch (error) {
          console.log('User denied account access');
        }
      } else {
        console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
      }
    } else {
      if(klaytn) {
        try {
          var isFail = false;

          if(isProgress) isFail=true;
          setIsProgress(true);
          isProgress=true;

          if(blockNumber>=mintStartBlockNumber&&maxMintCount>=Number(nowMintCount)+Number(mintCount)&&balance>=+(mintPrice*mintCount).toFixed(2)&&Number(network)===Number(process.env.REACT_APP_NETWORK)&&!isFail) { //8217 1001
              
              const delay = ms => new Promise(res => setTimeout(res, ms));
                    const data = caver.klay.abi.encodeFunctionCall( 
                    {
                      "name": "publicMint",
                      "constant": false,
                      "inputs": [
                        {
                          "name": "requestedCount",
                          "type": "uint256"
                        }
                      ],
                      "outputs": [],
                      "payable": true,
                      "stateMutability": "payable",
                      "type": "function"
                    }, [ mintCount ]);
                    
                    const _value = await caver.klay.estimateGas({ 
                      from: account,
                      to: `${process.env.REACT_APP_JB_CONTRACT_ADDRESS}`,
                      data: data,
                      value: caver.utils.toPeb(`${mintPrice*mintCount}`, 'KLAY'),
                    });
                    await caver.klay.sendTransaction({
                      type: 'SMART_CONTRACT_EXECUTION', 
                      from: account,
                      to: `${process.env.REACT_APP_JB_CONTRACT_ADDRESS}`,
                      value: caver.utils.toPeb(`${mintPrice*mintCount}`, 'KLAY'),
                      gas: _value*mintCount,
                      data
                    })
                    .once('receipt', async (receipt) => {
                          // const delay = ms => new Promise(res => setTimeout(res, ms));
                          enqueueSnackbar( `${mintCount} 마리의 귀여운 잔나비 민팅이 성공했습니다!` , { variant: 'success' });
                          await delay(2000);

                          await setAccountInfo(klaytn);
                    })
                    .once('error', async (error) => {
                      enqueueSnackbar( '민팅이 실패했습니다. 문의가 필요하시면 카톡방을 통해 연락해주세요.', { variant: 'warning' });
                      isFail=true;
                      console.error(error);
                      await delay(2000);

                      await setAccountInfo(klaytn);
                    });
                    // .catch(async (err)=> {
                    //     enqueueSnackbar( '민팅이 실패했습니다. 문의가 필요하시면 카톡방을 통해 연락해주세요.', { variant: 'error' });
                    //     isFail=true;
                    //     await setAccountInfo(klaytn);
                    // });
          }
        } catch (error) {
          console.log(error);
          console.log('Transaction Fail');
        }

        await setAccountInfo(klaytn);
      } else {
        console.log('Non-Kaikas browser detected. You should consider trying Kaikas!');
      }
    }
    
    setIsProgress(false);
  }

  async function setAccountInfo() {
    const { klaytn } = window;
  
    if (klaytn === undefined) return;

    const _account = klaytn.selectedAddress;
    if(_account===undefined) return;
    const balance = await caver.klay.getBalance(_account);

    setAccount(_account);
    setBalance(caver.utils.fromPeb(balance, 'KLAY'));

    if(contract===undefined) {
      contract = new caver.klay.Contract(JB_ContractABI, `${process.env.REACT_APP_JB_CONTRACT_ADDRESS}`, { gasPrice: '20000000000' });
      setContract(contract);
    }
    
    await contract.call("mintingInformation").then(res => {
        const _nowMintCount = Number(res[1])-1;
        setNowMintCount(_nowMintCount);
        setLimitCountPerBlock(Number(res[2]));  // 2 - Mint, 3 - WLMint
        setMaxValue(Math.min(Number(res[2]),Number(res[6])-Number(_nowMintCount)));
        setMintStartBlockNumber(Number(res[5]));
        setMaxMintCount(Number(res[6]));
        setMintPrice(caver.utils.fromPeb(res[7], 'KLAY'));
    });

    // await axios.post(`https://api.${process.env.REACT_APP_PUBLICLINK}/randomMintingCB`).then((res) => { 
      
    // });
    
    // await new Promise((resolve, reject) => setTimeout(resolve, 3000)).then(handleResultClose);

    if(Number(network) !== Number(process.env.REACT_APP_NETWORK)) {
      setOpen(true);
    }
    setShowInfo(true);
  }

  function setNetworkInfo() {
    const { klaytn } = window;

    if (klaytn === undefined) return;

    network = klaytn.networkVersion;
    setNetwork(klaytn.networkVersion);
    klaytn.on('networkChanged', () => setNetworkInfo(klaytn.networkVersion));
    
    if(Number(network) !== Number(process.env.REACT_APP_NETWORK)) { //8217 1001
      setOpen(true);
    }
  }

  async function setContractInfo() {
    // console.log(JB_ContractABI);
    var _c = new caver.klay.Contract(JB_ContractABI, `${process.env.REACT_APP_JB_CONTRACT_ADDRESS}`, { gasPrice: '20000000000' });
    // console.log(_c);
    await _c.call("mintingInformation").then(res => {
        const _nowMintCount = Number(res[1])-1;
        setNowMintCount(_nowMintCount);
        setLimitCountPerBlock(Number(res[2]));  // 2 - Mint, 3 - WLMint
        setMaxValue(Math.min(Number(res[2]),Number(res[6])-Number(_nowMintCount)));
        setMintStartBlockNumber(Number(res[5]));
        setMaxMintCount(Number(res[6]));
        setMintPrice(caver.utils.fromPeb(res[7], 'KLAY'));
    });
    contract = _c;
    setContract(_c);
  }

  let ResultRandomText = () => {
    const idx = randomRange(1,4);
    let text;
    if(idx===1) {
      text='어멋~! 너무 이쁘당!!';
    } else if(idx===2) {
      text='오.. 축하드립니다!!';
    } else if(idx===3) {
      text='세상에서 하나뿐인 당신의 NFT입니다!';
    } else {
      text='대박이다 대박!';
    }

    return (
      <>
        <p>{text}</p>
      </>
    )
  }

  const handleNetworkClose = () => {
    setOpen(false);
  };

  return (
    <>
    
      
    {/* <header className="App-header">
      <a href='https://riddlehead.net'><img src={logo} className="App-logo" alt="logo" /></a>
      <a href='https://open.kakao.com/o/g0NONnKd'><img src={openChat} className="Link-logo" alt="link-logo" /></a>
    </header> */}
    <div className='JB_MintContainer' 
      style={{
      backgroundImage: `url(${
        process.env.PUBLIC_URL + "img/intro/intro_bg.png"
      })` 
    }}>
      
      <div className="JB_Mint">
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
        <div className='JB_MintImage'>
          <img src="img/reveal/WJBZ-unreveal.gif"/>
        </div>
        <div className='JB_MintContents'>
          <div className="JB_Status">
            <span className="Status_title">Minting Status</span>
            Current Block (KAS API) : #{blockNumber}<br/>
            Minting Starts at : #{mintStartBlockNumber}<br/>
            <span className='JB_SubText'>*정확한 블록 높이 정보 <a href='https://scope.klaytn.com/'>클레이튼스코프</a>, <a href='https://klayswap.com/'>클레이스왑</a>을 참고 바랍니다.</span>
          </div>
          <div className="JB_Text1">
            {nowMintCount} / {maxMintCount}
          </div>
          <div className="JB_Text2">
            Mint Round - PublicSale
          </div>
          <div className="JB_MintAmount">
            <Button className='JB_AmountMinusButton' onClick={()=> {onChangeAmount(false)}} sx={{ fontFamily:'NCSRadhiumz', fontSize: '32px', color: '#ffc800' }} disabled={mintCount<=1||isProgress}>-</Button>
            <div className='JB_Amount'><input type="number" placeholder={mintCount} min="1" max={limitCountPerBlock.toString()} onChange={(e)=> { 
              // console.log(Number(maxMintCount)-Number(nowMintCount),limitCountPerBlock);
              if(Math.min(e.target.value,1)!==1) {
                e.target.value=1;
                // document.getElementsByClassName("JB_AmountMinusButton").disabled=true;
              } else if(Math.max(e.target.value,maxValue)!==maxValue) { 
                e.target.value=maxValue;
                // document.getElementsByClassName("JB_AmountPlusButton").disabled=true;
              }
              // console.log(e.target.value);
              setMintCount(Number(e.target.value));
              }} ref={countInput}/></div>
            <Button className='JB_AmountPlusButton' onClick={()=> {onChangeAmount(true)}} sx={{ fontFamily:'NCSRadhiumz', fontSize: '32px', color: '#ffc800' }} disabled={mintCount>=maxValue||isProgress}>+</Button>
          </div>
          <div className="JB_Text3"><span>Price</span>{+(mintPrice*mintCount).toFixed(2)} KLAY</div>
          <div className="JB_Info">
            WALLET KEY : {account.substring(0,6)+' ... '+account.substring(account.length-6)}<br/>
            MY KLAY : {+(balance*1.0).toFixed(3)} KLAY
          </div>
          
          <Button className='JB_MintButton' onClick={()=> {onMintBtn(1)}} sx={{ fontFamily:'BMJUA', fontSize: '16px', color: '#ffc800' }} disabled={showInfo&&(blockNumber<mintStartBlockNumber||maxMintCount<Number(nowMintCount)+Number(mintCount)||balance<+(mintPrice*mintCount).toFixed(2)||Number(network)!==Number(process.env.REACT_APP_NETWORK)||isProgress)}>{!showInfo ? "CONNECT WALLET" : "MINT"}</Button>
        </div>
        <div className="JB_Guide">* 민팅 가격 이외 가스 수수료가 발생할 수 있으므로 민팅금액 + 3KLAY 정도의 여유분을 보유한 상태에서 민팅을 진행해주시길 권장합니다.<br/>
                                  * 민팅 오류가 발생한 경우 <a href='https://open.kakao.com/o/shttjK9d' target="_blank">여기</a>를 클릭하여 통해 문의 남겨주시면 신속히 도와드리겠습니다.</div>
      </div>

        { isProgress ? <Box sx={{ position: 'absolute', top: 'calc(50% - 140px)', left: 'calc(50% - 40px)', zIndex:300, width: 80, height: 80 }}><CircularProgress size={80} /></Box>: null}
        {/* <ReactTyped
          typeSpeed={150}
          backSpeed={60}
          strings={["<span class='JC_guide'>- Hey, <span class='red'>20Klay</span> will give you a new life</span>"]}
          smartBackspace
          shuffle={false}
          backDelay={1}
          fadeOut={false}
          fadeOutDelay={100}
          loopCount={0}
          showCursor={false}
        /> */}
      {/* { showInfo ? <LoginInfo/> : null } */}
      
      {/* <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          component="img"
          className="Mint-image"
          height="140"
          image = {testImage}
        />
        <CardActionArea>
          <CardContent sx={{ p: 0 }}>
            
          </CardContent>
        </CardActionArea>
      </Card> */}
      
      {/* <div className='JC_Info2'>
        <span>랜덤 민팅 안내</span><br/><br/>
        <p>1. WALLET CONNECT 버튼을 눌러 카이카스 지갑을 연결합니다.<br/>
            2. 총 발행량은 10,000개이며 민팅 1회 당 <span className="red">20Klay</span>입니다.<br/>
            3. 오픈씨 서버 상태에 따라 민팅된 리들이 표시되기까지 약간의 시간이 소요될 수 있습니다.<br/>
            4. 민팅에 대한 문의사항은 공식 오픈채팅방에 올려주세요.<br/>
            <span className="red">* 민팅 진행 중에 새로고침을 절대로 누르지 마세요! 해당 사안에 따른 민팅 오류는 배상해주지 않습니다!</span><br/>
        </p>
      </div> */}

    </div>
      <div>
        <Dialog
          open={open}
          onClose={handleNetworkClose}
        >
          <DialogTitle sx={{ textAlign:'center', fontFamily:'NotoSans', }}>
            {"Need to Change Kaikas Network"}
          </DialogTitle>
          <DialogContent sx={{ display:'grid', alignItems: 'center', justifyContent: 'center' }}>
            <DialogContentText sx={{ fontFamily:'NotoSans', }}>
              Kaikas 네트워크를  {1001==Number(process.env.REACT_APP_NETWORK) ? "테스트넷" : "메인넷"}으로 변경해주세요!
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button sx={{ fontFamily:'NotoSans', fontSize:'1em' }} onClick={handleNetworkClose} autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      
    </>
  );
}

export default WJBZMint;
