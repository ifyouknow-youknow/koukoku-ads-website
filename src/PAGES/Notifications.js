import React, { useEffect, useState } from 'react'
import { DashNavigation } from './UTILITIES/DashNavigation'
import { Footer } from './UTILITIES/Footer'
import '../STYLES/Notifications.css'
import { auth_CheckSignedIn, firebase_GetAllDocumentsQueried } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Loading } from './UTILITIES/Loading'
import { formatDate } from '../functions'

export default function Notifications() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);

    async function init() {
        setLoading(true);
        await auth_CheckSignedIn(async (user) => {
            await firebase_GetAllDocumentsQueried(`KoukokuAds_Notifications`, [
                { field: 'userId', operator: '==', value: user.id }
            ], (docs) => {
                setNotifications(docs);
            })
        }, navigate)
        setLoading(false);

    }
    useEffect(() => {
        init();
    }, [])

    return (
        <div className='poppins'>
            {loading && <Loading />}
            <DashNavigation />
            <div className='main'>
                <h1 className='page-title no'>
                    Notifications
                </h1>
                <div className='notification-wrap'>
                    {
                        notifications.map((not, i) => {
                            return <div className='notification-block' key={i}>
                                <h2 className='notification-title'>{not.title}</h2>
                                <p className='notification-body'>{not.body}</p>
                                <p className='notification-date'>{formatDate(new Date(not.date))}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
