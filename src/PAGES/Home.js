import { useEffect } from "react";
import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import img1 from '../IMAGES/home-ads.jpg'
import '../STYLES/Home.css'
import { Spacer } from './UTILITIES/Spacer'
import img2 from '../IMAGES/home2.png'
import img3 from '../IMAGES/home1.png'
import ad1 from '../IMAGES/homead1.png'
import ad2 from '../IMAGES/homead2.png'

export function Home() {



    return <div className="poppins">
        <Navigation />
        <div className="main">
            <Spacer height={80} />
            <div className="home-body">
                <h1 className="home-title">Advertisement<br />Mahem!</h1>
                <Spacer height={100} />
                <h2 className="home-caption">Let’s ignite a new era of advertising: No more bots. No more scams. No more intrusive, unwanted ads. It’s time for authentic, meaningful connections between businesses and people—advertising that respects privacy, values quality, and delivers what truly matters.</h2>
                <Spacer height={80} />
                <div className="home-pair">
                    <div className="home-block">
                        <h1 className='home-head'>Get your first ad for free!</h1>
                        <p className="home-text">If you are interested in allowing us to set up your account, design and launch your first campaign, please let us know!</p>
                    </div>
                    <img src={ad1} className="home-ad" />
                </div>
                <Spacer height={20} />
                <div className="home-pair">
                    <div className="home-block">
                        <h1 className='home-head'>Get rid of your advertising problems.</h1>
                        <p className="home-text">Creating and publishing an ad takes effort, but too often, those hard-earned views and clicks come from fake accounts, scams, or bots.</p><br />
                        <p className="home-text">People visit the app specifically to explore ads, unlike on other platforms where ads often feel intrusive. The Ads Mahem app transforms how ads are viewed—eliminating the negative outlook and creating a space where ads are genuinely wanted.</p>
                    </div>
                    <img src={ad2} className="home-ad" />
                </div>

            </div>
            <Spacer height={80} />
            <img src={img2} className="home-img-left" />
            <img src={img3} className="home-img-right" />
        </div>
        <Footer />
    </div>
}