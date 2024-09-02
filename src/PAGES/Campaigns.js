import React, { useEffect, useState } from 'react'
import { DashNavigation } from './UTILITIES/DashNavigation'
import { Footer } from './UTILITIES/Footer'
import '../STYLES/Notifications.css'
import { auth_CheckSignedIn, firebase_GetAllDocumentsQueried } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Loading } from './UTILITIES/Loading'
import { formatDate } from '../functions'

export default function Campaigns() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function init() {

    }
    useEffect(() => {
        window.scrollTo(0, 0);
        init();
    }, [])

    return (
        <div className='poppins'>
            {loading && <Loading />}
            <DashNavigation />
            <div className='main'>
                <h1 className='page-title no'>
                    Campaigns
                </h1>
            </div>
            <Footer />
        </div>
    )
}
