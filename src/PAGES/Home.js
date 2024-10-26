import { useEffect } from "react";
import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import img1 from '../IMAGES/home-ads.jpg'
import '../STYLES/Home.css'
import { Spacer } from './UTILITIES/Spacer'
import img2 from '../IMAGES/home2.png'
import img3 from '../IMAGES/home1.png'

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
            </div>

            <img src={img2} className="home-img-left" />
            <img src={img3} className="home-img-right" />
        </div>
        <Footer />
    </div>
}