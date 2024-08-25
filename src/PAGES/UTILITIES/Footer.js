import '../../STYLES/Footer.css'
import logo from '../../IMAGES/kokoku-ads-logo.png'
import { Clickable } from './Clickable'

export function Footer() {
    return <div className="footer poppins">
        <p className='footer-desc'>Kokoku Ads is a top-tier platform for displaying ads with unbeatable pricing and reliable data you can trust. Unlike other ad networks, Kokoku Ads takes a strong stand against the growing presence of bots, ensuring your campaigns reach real people, not fake clicks. Whether you're a small business or a large enterprise, Kokoku Ads offers transparent metrics, cost-effective options, and the peace of mind that comes with knowing your ad spend isn't wasted on fraudulent activity. When it comes to affordability and trust, Kokoku Ads leads the way.</p>
        <br />
        <br />
        <div className='center'>

            <Clickable onPress={() => { console.log("CLICKED") }}>
                <img src={logo} className='footer-img' />
            </Clickable>
        </div>
        <br />
        <p className='footer-copy'>Copyright © 2024 Innovative Internet Creations LLC. All rights reserved.</p>
    </div>
}