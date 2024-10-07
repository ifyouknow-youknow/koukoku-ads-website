import logo from '../../IMAGES/koukoku-ads-logo.png'
import { Clickable } from './Clickable'
import { GiHamburgerMenu } from "react-icons/gi";
import '../../STYLES/DashNavigation.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlineXMark } from "react-icons/hi2";
import { TbPlanet } from "react-icons/tb";
import { auth_CheckSignedIn, auth_SignOut, firebase_GetAllDocumentsQueried, firebase_GetDocument } from '../../firebase';
import { RiArrowGoForwardLine } from "react-icons/ri";

export function DashNavigation() {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const [me, setMe] = useState({});

    useEffect(() => {
        auth_CheckSignedIn((person) => {
            const userId = person.uid;
            console.log(person)
            firebase_GetDocument('KoukokuAds_Businesses', userId, (thisIs) => {
                setMe(thisIs)
            })
        }, navigate)
    }, [])


    return <div>
        <div className='separate-h'>
            <Clickable onPress={() => { navigate('/campaigns') }}><img src={logo} className='nav-logo' /></Clickable>
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
                <Clickable onPress={async () => {
                    await firebase_GetAllDocumentsQueried('KoukokuAds_Campaigns', [
                        { field: 'userId', operator: '==', value: me.id },
                        { field: 'active', operator: '==', value: true }
                    ], (docs) => {
                        if (docs.length < 5) {
                            setToggle(false);
                            navigate('/create-ad');
                        } else {
                            setToggle(false);
                            alert('You have reached the maximum limit of 5 ads. Please remove an existing ad or wait until one becomes deactivated before creating a new one.')
                        }
                    });

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
                        navigate('/campaigns');
                    }}>
                        <div className='h'>
                            <p className='dashnav-body-link'>
                                Campaigns
                            </p>
                            {/* <FaArrowRight className='dashnav-link-icon' /> */}
                        </div>
                    </Clickable>
                </div>
                <div className='p-l'>
                    <Clickable onPress={() => {
                        setToggle(false);
                        navigate('/notifications');
                    }}>
                        <div className='h'>
                            <p className='dashnav-body-link'>
                                Notifications
                            </p>
                            {/* <FaArrowRight className='dashnav-link-icon' /> */}
                        </div>
                    </Clickable>
                </div>
                <div className='right full-width'>
                    <Clickable onPress={() => {
                        auth_SignOut((success) => {
                            if (success) {
                                navigate('/login')
                            }
                        })
                    }}>
                        <div className='side-by align-center'>
                            <p className='white small-link'>sign out</p>
                            <RiArrowGoForwardLine color='red' />
                        </div>
                    </Clickable>
                </div>
            </div>

        </div>}
    </div>
}