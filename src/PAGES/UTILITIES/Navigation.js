import { useNavigate } from 'react-router-dom'
import logo from '../../IMAGES/koukoku-ads-logo.png'
import '../../STYLES/Navigation.css'
import { Clickable } from './Clickable'

export function Navigation() {
    const navigate = useNavigate();

    return <div className='nav-top'>
        <div className='nav-top-left'>
            <Clickable onPress={() => { navigate('/') }}><img src={logo} className='nav-logo' /></Clickable>
            <p className='nav-name'>KOUKOKU Ads</p>
        </div>
        <div className='nav-top-right'>
            <button className='nav-link pointer poppins'>Docs</button>
            <button onClick={() => { navigate('/login') }} className='nav-link-login bg-black pointer poppins'>Login</button>
            <button onClick={() => { navigate('/signup') }} className='nav-link-login bg-blue pointer poppins'>Sign Up</button>
        </div>
    </div>
}