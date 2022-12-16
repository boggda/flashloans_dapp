import React from "react";
import {Link,Outlet} from 'react-router-dom'
import { useState } from "react";
import {CiWallet} from 'react-icons/ci' 
import {BsInfoLg} from 'react-icons/bs'
import {ImDroplet} from 'react-icons/im'
import {TiFlashOutline} from 'react-icons/ti'
import Logo from '../images/logo.png'
import { useEffect } from "react";
import { _connectWallet } from "../Web3/ConnectWallet";
//import {NETWORK_ID, CONTRACT_ADDRESS} from "../Config/config";

const Layout = () => {
    const [itemsMenuDesktop, ] = useState([       
        {value: 'Home', linkTo: '/',id:1, content: 'BsInfoLg'},
        {value: 'Pool', linkTo: '/pool',id:2, content: 'BsInfoLg'},
        {value: 'About the application', linkTo: '/Abouttheapplication',id:3, content: 'BsInfoLg'},
        {value: 'flashloans', linkTo: '/flashloans',id:4,  content: 'BsInfoLg'},
    ])

    const [isFocus1, setFocus1] = useState(false)
    const [isFocus2, setFocus2] = useState(false)
    const [isFocus3, setFocus3] = useState(false)

    useEffect(()=>{
        setFocus3(true)
        if(setFocus2 === true || setFocus1 === true){
            setFocus3(false)
        }
    },[setFocus2,setFocus1]);

    const [userAddr, setUserAddr] = useState("");

    const handleWalletConnect = async event => {
        await _connectWallet();
        setUserAddr(window.selectedAddress);
    };

    return (
        <div className="layout_wrapper">
            <header>
                <div className="header__container">
                    <div className="logo">
                            <Link to="/">
                                <img src={Logo} alt="" />
                            </Link>                      
                    </div>
                    {userAddr && (
                        <div className="user_toDO">
                            <p>{userAddr}</p>
                        </div>
                    )}
                    {!userAddr && (
                        <div className="user_toDO">  
                            <button className="auth" onClick={handleWalletConnect}>
                                <CiWallet size={38}/>
                                Connect wallet
                            </button>
                        </div>
                    )}
                </div>
            </header>
            <main>
                <nav className="side_nav">
                    <div className="menu_side">
                        <Link to='/pool' onClick={()=>{
                            setFocus1(true)
                            setFocus2(false)
                            setFocus3(false)
                        }}>
                           <ImDroplet size={32} className={isFocus1 ? "focus" : ""}/>
                            Staking
                        </Link>
                        <Link to='/flashloans' onClick={()=>{
                            setFocus2(true)
                            setFocus1(false)
                            setFocus3(false)
                            }}>
                            <TiFlashOutline size={32} className={isFocus2 ? "focus" : ""}/>
                            FlashLoans

                        </Link>
                        <Link to='/about' onClick={()=>{
                            setFocus3(true)
                            setFocus1(false)
                            setFocus2(false)
                            }}>
                            <BsInfoLg size={32} className={isFocus3 ? "focus" : ""}/>
                            About the application
                        </Link>
                    </div>
                </nav>
                <div className="content_main">
                    <Outlet />
                </div>
            </main>
            {/* <footer>
               footer
               
            </footer> */}
        </div>
    )
}

export default Layout