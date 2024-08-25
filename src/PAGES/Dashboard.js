import { useEffect, useState } from "react";
import { DashNavigation } from "./UTILITIES/DashNavigation";
import { auth_SignOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Footer } from "./UTILITIES/Footer";

export function Dashboard() {
    const navigate = useNavigate();
    // 
    useEffect(() => {
        // auth_SignOut((success) => {
        //     if (success) {
        //         navigate('/login');
        //     }
        // });
    }, [])


    return <div className="poppins">
        <DashNavigation />
        <div className="main">

        </div>
        <Footer />
    </div>
}