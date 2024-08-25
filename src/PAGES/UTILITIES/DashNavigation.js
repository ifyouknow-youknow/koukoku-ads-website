import logo from '../../IMAGES/kokoku-ads-logo.png'
import { Clickable } from './Clickable'
import { GiHamburgerMenu } from "react-icons/gi";
import '../../STYLES/DashNavigation.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import { WiStars } from "react-icons/wi";
import { TbPlanet } from "react-icons/tb";

export function DashNavigation() {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    return <div>
        <div className='separate-h'>
            <img src={logo} className='nav-logo' />
            <Clickable onPress={() => { setToggle(true) }}>
                <div className='dashnav-burger'>
                    <GiHamburgerMenu className='dashnav-burger-icon' />
                </div>
            </Clickable>
        </div>
        {toggle && <div className='dashnav-body separate-v'>
            <div className='right p h'>
                <Clickable onPress={() => { setToggle(false) }}><p className='dashnav-close'>close</p></Clickable>
                <HiOutlineXMark className='dashnav-close-icon' />
            </div>
            <div className='dashnav-body-links'>
                <Clickable onPress={() => {
                    setToggle(false);
                    navigate('/create-ad');
                }}>
                    <div className='h dashnav-create'>
                        <p className='dashnav-body-link'>
                            Create New Ad
                        </p>
                        <TbPlanet className='dashnav-link-icon' />
                    </div>
                </Clickable>
                <div className='p-l'>
                    <Clickable onPress={() => {
                        setToggle(false);
                        navigate('/dashboard');
                    }}>
                        <div className='h'>
                            <p className='dashnav-body-link'>
                                Dashboard
                            </p>
                            {/* <FaArrowRight className='dashnav-link-icon' /> */}
                        </div>
                    </Clickable>
                </div>
                <div className='p-l'>
                    <Clickable onPress={() => {
                        setToggle(false);
                        navigate('/dashboard');
                    }}>
                        <div className='h'>
                            <p className='dashnav-body-link'>
                                Subscribers
                            </p>
                            {/* <FaArrowRight className='dashnav-link-icon' /> */}
                        </div>
                    </Clickable>
                </div>
                <div className='p-l'>
                    <Clickable onPress={() => {
                        setToggle(false);
                        navigate('/dashboard');
                    }}>
                        <div className='h'>
                            <p className='dashnav-body-link'>
                                Account
                            </p>
                            {/* <FaArrowRight className='dashnav-link-icon' /> */}
                        </div>
                    </Clickable>
                </div>
            </div>
        </div>}
    </div>
}