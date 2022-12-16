
import WindowContent from "../UI/window"
import { useState } from "react"
import {CiCircleChevDown} from 'react-icons/ci'

const Pool = () =>{

    const [isOpen1, setOpenWindow1] = useState(false)
    const [isOpen2, setOpenWindow2] = useState(false)
    const [isOpen3, setOpenWindow3] = useState(false)
    const [isOpen4, setOpenWindow4] = useState(false)

    return (
        <div className={isOpen1 || isOpen2 || isOpen3 || isOpen4 ?  "pool__container contain" : "pool__container"}>
            <div className="content">
                <p>Staking</p>
                <div className="objectW1 item1">
                    <div className="desc">
                        <p>Deposit ETH</p>
                        <div className={isOpen1 ? "selector open" : "selector"} onClick={()=>setOpenWindow1(!isOpen1)}>
                            <CiCircleChevDown size={50} className={isOpen1 ? "svgopen" : "svgnone"}/>
                        </div>
                    </div>
                    <div className="spoiler_content">
                        {
                            isOpen1 ? 
                            <WindowContent>
                                <p>Ether value</p>
                                <input type="value" placeholder="Ether value" onChange={(e)=> e.target.value}/>
                                <div className="buttons_container">
                                    <button>Deposit</button>
                                </div>
                            </WindowContent> : ''
                        }
   
                    </div>
                </div>
                
                <div className="objectW1 item2">
                    <div className="desc">
                        <p>Deposit tokens</p>
                        <div className={isOpen2 ? "selector open" : "selector"} onClick={()=>setOpenWindow2(!isOpen2)}>
                            <CiCircleChevDown size={50} className={isOpen2 ? "svgopen" : "svgnone"}/>
                        </div>
                    </div>
                    <div className="spoiler_content">
                        {
                            isOpen2 ? 
                            <WindowContent>
                                <p>Token address</p>
                                <input placeholder="token address"/>
                                <p>Token value</p>
                                <input placeholder="token value"/>
                                <div className="buttons_container">
                                    <button>Deposit</button>
                                </div>
                            </WindowContent> : ''
                        }
   
                    </div>
                </div>
                <div className="objectW1 item3">
                    <div className="desc">
                        <p>Withdraw ETH</p>
                        <div className={isOpen3 ? "selector open" : "selector"} onClick={()=>setOpenWindow3(!isOpen3)}>
                            <CiCircleChevDown size={50} className={isOpen3 ? "svgopen" : "svgnone"}/>
                        </div>
                    </div>
                    <div className="spoiler_content">
                        {
                            isOpen3 ? 
                            <WindowContent>
                                <div className="buttons_container btn">
                                    <button>Withdraw</button>
                                </div>
                            </WindowContent> : ''
                        }
   
                    </div>
                </div>
                <div className="objectW1 item4">
                    <div className="desc">
                        <p>Withdraw tokens</p>
                        <div className={isOpen4 ? "selector open" : "selector"} onClick={()=>setOpenWindow4(!isOpen4)}>
                            <CiCircleChevDown size={50} className={isOpen4 ? "svgopen" : "svgnone"}/>
                        </div>
                    </div>
                    <div className="spoiler_content">
                        {
                            isOpen4 ? 
                            <WindowContent>
                                <p>Token address</p>
                                <input placeholder="token address"/>
                                <div className="buttons_container">
                                    <button>Withdraw</button>
                                </div>
                            </WindowContent> : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pool