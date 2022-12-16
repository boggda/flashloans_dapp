import WindowContent from "../UI/window";
import { useState } from "react";
import {useRef} from 'react';
import {CiCircleChevDown} from 'react-icons/ci';
import { _flashLoanERC, _flashLoanETH } from "../Web3/ConnectWallet";

const Flashloans = () =>{

    const [isOpen1, setOpenWindow1] = useState(false)
    const [isOpen2, setOpenWindow2] = useState(false)

    const flashLoanETHAdrRef = useRef(null);
    const flashLoanETHValRef = useRef(null);
    const flashLoanERCAdrRef = useRef(null);
    const flashLoanERCTAdrRef = useRef(null);
    const flashLoanERCValRef = useRef(null);

    function handleFlashLoanETH() {
        _flashLoanETH(flashLoanETHValRef.current.value, flashLoanETHAdrRef.current.value);
    }

    function handleFlashLoanERC() {
        _flashLoanERC(flashLoanERCTAdrRef.current.value, flashLoanERCValRef.current.value, flashLoanERCAdrRef.current.value);
    }

    return (
        <div className={isOpen1 || isOpen2 ? "flashloans__container contain" : "flashloans__container"}>
            <div className="content">
                <p>Flash Loans</p>
                <div className="objectW1 item1">
                    <div className="desc">
                        <p>FlashLoan ETH</p>
                        <div className={isOpen1 ? "selector open" : "selector"} onClick={()=>setOpenWindow1(!isOpen1)}>
                            <CiCircleChevDown size={50} className={isOpen1 ? "svgopen" : "svgnone"}/>
                        </div>
                    </div>
                    <div className="spoiler_content">
                        {
                            isOpen1 ? 
                            <WindowContent>
                                <p>Contract address</p>
                                <input ref={flashLoanETHAdrRef} placeholder="contract address"/>
                                <p>Amount</p>
                                <input ref={flashLoanETHValRef} placeholder="amount"/>
                                <div className="buttons_container">
                                    <button onClick={handleFlashLoanETH}>Execute FlashLoan</button>
                                </div>
                            </WindowContent> : ''
                        }
   
                    </div>
                </div>
                
                <div className="objectW1 item2">
                    <div className="desc">
                        <p>FlashLoan Tokens</p>
                        <div className={isOpen2 ? "selector open" : "selector"} onClick={()=>setOpenWindow2(!isOpen2)}>
                            <CiCircleChevDown size={50} className={isOpen2 ? "svgopen" : "svgnone"}/>
                        </div>
                    </div>
                    <div className="spoiler_content">
                        {
                            isOpen2 ? 
                            <WindowContent>
                                <p>Contract address</p>
                                <input ref={flashLoanERCAdrRef} placeholder="contract address"/>
                                <p>Amount</p>
                                <input ref={flashLoanERCValRef} placeholder="amount"/>
                                <p>Token address</p>
                                <input ref={flashLoanERCTAdrRef} placeholder="token address"/>
                                <div className="buttons_container">
                                    <button onClick={handleFlashLoanERC}>Execute FlashLoan</button>
                                </div>
                            </WindowContent> : ''
                        }
   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flashloans