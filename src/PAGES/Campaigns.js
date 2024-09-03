import React, { useEffect, useState } from 'react'
import { DashNavigation } from './UTILITIES/DashNavigation'
import { Footer } from './UTILITIES/Footer'
import '../STYLES/Notifications.css'
import { auth_CheckSignedIn, firebase_GetAllDocumentsQueried } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Loading } from './UTILITIES/Loading'
import { formatDate } from '../functions'
import { Spacer } from './UTILITIES/Spacer'
import { AsyncImage } from './UTILITIES/AsyncImage'

export default function Campaigns() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    async function init() {
        await auth_CheckSignedIn((user) => {
            firebase_GetAllDocumentsQueried('KoukokuAds_Campaigns', [
                { field: 'userId', 'operator': '==', value: user.id }
            ], (docs) => {
                setCampaigns(docs);
            })
        }, navigate);

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
                <Spacer height={15} />
                {
                    campaigns.map((camp, i) => {
                        return <div key={i}>
                            <AsyncImage imagePath={camp.imagePath} width={100} height={100} />
                        </div>
                    })
                }
            </div>
            <Footer />
        </div>
    )
}
