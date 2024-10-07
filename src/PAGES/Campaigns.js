import React, { useEffect, useState } from 'react'
import { DashNavigation } from './UTILITIES/DashNavigation'
import { Footer } from './UTILITIES/Footer'
import '../STYLES/Notifications.css'
import { auth_CheckSignedIn, firebase_DeleteDocument, firebase_GetAllDocumentsQueried, firebase_GetDocument, storage_UploadMedia } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Loading } from './UTILITIES/Loading'
import { formatDate, formatShortDate, server_PostAPI, sortObjects } from '../functions'
import { Spacer } from './UTILITIES/Spacer'
import { AsyncImage } from './UTILITIES/AsyncImage'
import '../STYLES/Campaigns.css'
import { FaRegHandSpock } from 'react-icons/fa'
import { Clickable } from './UTILITIES/Clickable'
import { Dialog } from './UTILITIES/Dialog'
import { server_POST } from '../server'
import { BiHandicap, BiTrash } from 'react-icons/bi'

export default function Campaigns() {
    const navigate = useNavigate();
    const [me, setMe] = useState({});
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [chosenAd, setChosenAd] = useState({});
    const [showRemove, setShowRemove] = useState(false);

    async function init() {
        setLoading(true);
        await auth_CheckSignedIn((user) => {
            firebase_GetDocument(`KoukokuAds_Businesses`, user.id, (profile) => {
                setMe(profile);
            })
            firebase_GetAllDocumentsQueried('KoukokuAds_Campaigns', [
                { field: 'userId', 'operator': '==', value: user.id }
            ], (docs) => {
                setCampaigns(sortObjects(docs, 'active', 'desc'));
            })
        }, navigate);
        setLoading(false)
    }

    async function onSubmitReview() {
        const ad = chosenAd;
        setShowDialog(false);
        setLoading(true);
        const body = {
            amount: ad.views * (ad.chosenOption === "1 x 1" ? 2 : ad.chosenOption === "2 x 1" ? 4 : 5),
            currency: 'jpy',
            itemName: `${ad.views} views`,
            itemDescription: `${ad.chosenOption} ad.`,
            args: {
                userId: me.id,
                views: parseInt(ad.views),
                chosenOption: ad.chosenOption,
                imagePath: ad.imagePath,
                date: parseInt(Date.now()),
                isCoupon: Boolean(ad.isCoupon),
                expDate: ad.isCoupon ? ad.expDate : 0,
                isRepeating: Boolean(ad.isRepeating),
                geohash: me.geohash
            }
        }
        // 
        const res = await server_POST('create-payment-link', body);
        setLoading(false);
        // MAYBE CHANGE TO ADS
        window.open(`${res.url}`, "_blank")
        navigate('/campaigns')

    }
    async function onRemoveAd() {
        try {
            setShowRemove(false);
            setLoading(true);

            const collections = ['KoukokuAds_Scans', 'KoukokuAds_Following', 'KoukokuAds_Favorites'];

            // Loop through collections and delete documents
            for (const collection of collections) {
                await firebase_GetAllDocumentsQueried(collection, [
                    { field: 'adId', operator: '==', value: chosenAd.id }
                ], async (scans) => {
                    for (const scan of scans) {
                        await firebase_DeleteDocument(collection, scan.id);
                    }
                });
            }

            // Delete the ad from the 'KoukokuAds_Campaigns' collection
            await firebase_DeleteDocument('KoukokuAds_Campaigns', chosenAd.id);

            // Notify user and update UI
            setLoading(false);
            alert("Your ad has been removed.");
            setCampaigns((prev) => prev.filter((ad) => ad.id !== chosenAd.id));
            setChosenAd({});
        } catch (error) {
            console.error("Error removing ad:", error);
            setLoading(false);
            alert("Failed to remove ad. Please try again.");
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        init();
    }, [])

    return (
        <div className='poppins'>
            {loading && <Loading />}
            {showDialog && <Dialog title={'Submit for review'} message={'Are you sure you want to submit this ad for review? You will be redirected to the payment page.'} btnText={'Submit'} func={onSubmitReview} setToggle={setShowDialog} />}
            {showRemove && <Dialog title={'Remove advertisement'} message={'Are you sure you want to delete this ad? This action cannot be undone, but you can create a new ad at any time.'} btnText={'Remove'} func={onRemoveAd} setToggle={setShowRemove} />}
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
                                <div className='camp-block-img'>
                                    <AsyncImage imagePath={camp.imagePath} objectFit={'fill'} />
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div className='separate-h'>
                                        <h3 className='camp-title'>{camp.isCoupon ? "Coupon" : "Ad"}</h3>
                                        {camp.active && <p className='camp-active no'>active</p>}
                                        {!camp.active && <div className='button-reactivate'>
                                            <Clickable onPress={() => {
                                                setChosenAd(camp);
                                                setShowDialog(true);
                                            }}>
                                                <p>Reactivate</p>
                                            </Clickable>
                                        </div>}
                                    </div>
                                    <p className='camp-text'>{camp.chosenOption} units</p>
                                    <p className='camp-text'>{camp.views} views</p>

                                    {
                                        camp.isCoupon && <div className='camp-icon-pair'>
                                            <div className='camp-icon'>
                                                <FaRegHandSpock />
                                            </div>
                                            <p className='camp-exp'>Exp date: <br />{camp.isCoupon ? formatShortDate(new Date(camp.date)) : ""}</p>
                                        </div>
                                    }
                                    <br />
                                    <Clickable onPress={() => {
                                        setChosenAd(camp);
                                        setShowRemove(true);
                                    }}>
                                        <p className='camp-remove'>remove ad <BiTrash /></p>
                                    </Clickable>
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
