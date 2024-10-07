import { useEffect } from "react";
import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import img1 from '../IMAGES/home-ads.jpg'
import '../STYLES/Home.css'

export function Home() {



    return <div className="poppins">
        <Navigation />
        <div className="main">

            <div className="p">
                <img src={img1} width={"100%"} className="home-img" />
            </div>
            <h1 className="home-title">Advertisement<br />Mahem!</h1>
            <br />
            <h2 className="home-caption">Let’s ignite a new era of advertising: No more bots. No more scams. No more intrusive, unwanted ads. It’s time for authentic, meaningful connections between businesses and people—advertising that respects privacy, values quality, and delivers what truly matters.</h2>
        </div>
        <Footer />
    </div>
}