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
import '../STYLES/Campaigns.css'
import { FaRegHandSpock } from 'react-icons/fa'

export default function Campaigns() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    async function init() {
        setLoading(true);
        await auth_CheckSignedIn((user) => {
            firebase_GetAllDocumentsQueried('KoukokuAds_Campaigns', [
                { field: 'userId', 'operator': '==', value: user.id }
            ], (docs) => {
                setCampaigns(docs);
            })
        }, navigate);
        setLoading(false)
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
                <div className='camp-wrap'>
                    {campaigns.length === 0 && <div className='p'>
                        <p>No active campaigns.</p>
                    </div>}
                    {campaigns.length > 0 &&
                        campaigns.map((camp, i) => {
                            return <div className='camp-block p-h' key={i}>
                                <AsyncImage imagePath={camp.imagePath} width={90} height={90} />
                                <div style={{ width: "100%" }}>
                                    <div className='separate-h'>
                                        <h3 className='camp-title'>{camp.isCoupon ? "Coupon" : "Ad"}</h3>
                                        <p>{camp.Active ? "Active" : "Inactive"}</p>
                                    </div>
                                    <p className='camp-text'>{camp.chosenOption} units</p>
                                    <p className='camp-text'>{camp.views} views</p>
                                    <br />
                                    {
                                        camp.isCoupon && <div className='camp-icon-pair'>
                                            <div className='camp-icon'>
                                                <FaRegHandSpock />
                                            </div>
                                            <p className='camp-exp'>Exp date: <br />{camp.isCoupon ? formatDate(new Date(camp.date)) : ""}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}
