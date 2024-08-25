import { useEffect } from "react";
import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import { server_GET } from "../server";

export function Home() {



    return <div className="poppins">
        <Navigation />
        <div className="main">

        </div>
        <Footer />
    </div>
}