import { DashNavigation } from './UTILITIES/DashNavigation'
import { Footer } from './UTILITIES/Footer'
import '../STYLES/CreateAd.css'
import { Spacer } from './UTILITIES/Spacer'
import { Clickable } from './UTILITIES/Clickable'
import { MdAddPhotoAlternate } from "react-icons/md";
import { useState, useRef, useEffect } from 'react'
import { FaRegHandSpock } from "react-icons/fa6";
import { Divider } from './UTILITIES/Divider'
import { Loading } from './UTILITIES/Loading'
import { Dialog } from './UTILITIES/Dialog'
import { server_POST } from '../server'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from './UTILITIES/Checkbox'
import { auth_CheckSignedIn, firebase_GetDocument, storage_UploadMedia } from '../firebase'
import { randomString } from '../functions'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import ngeohash from 'ngeohash';

export function CreateAd() {
    const navigate = useNavigate();
    const [me, setMe] = useState(null);
    const [chosenOption, setChosenOption] = useState('1 x 1');
    const [chosenImage, setChosenImage] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [isCoupon, setIsCoupon] = useState(true);
    const [isRepeating, setIsRepeating] = useState(false);

    const size1Cost = 0.02;
    const size2Cost = 0.04;
    const size3Cost = 0.07;

    const viewOptions = [100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000];
    const getCost = (views) => {
        const costPerView = chosenOption === "1 x 1" ? size1Cost : chosenOption === "2 x 1" ? size2Cost : size3Cost;
        return (costPerView * views).toFixed(2);
    };

    const [address, setAddress] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const autocompleteRef = useRef(null);  // Reference for the address input field

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyA1ebAwpD6h_j9PPpXD8GYJczVMpjH-7A4", // replace with your API key
        libraries: ['places'], // load places library for autocomplete
    });

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '10px',
        marginTop: '10px'
    };

    const center = {
        lat: lat || 37.7749, // default latitude (San Francisco)
        lng: lng || -122.4194, // default longitude (San Francisco)
    };


    function onChooseImage(event) {
        console.log('File input event:', event);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setChosenImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    const handleOptionClick = (option) => {

        setChosenOption(option);
    }
    const handleUploadClick = () => {
        fileInputRef.current.click();
    }
    // 
    async function onSubmitReview() {
        setShowDialog(false);
        setLoading(true);
        const address = document.querySelector("#tbAddress").value;
        const views = parseInt(document.querySelector('#ddViews').value.split(" ")[0]);
        var expDate = "";
        if (document.querySelector("#dpExpiration") != null) {
            expDate = new Date(document.querySelector("#dpExpiration").value.replaceAll("-", "/"))
        }
        if (address == "") {
            setLoading(false);
            alert("Please provide a valid address.");
            return;
        }
        if (isCoupon && expDate == "") {
            setLoading(false);
            alert("Please provide a valid expiration date.");
            return;
        }

        const imagePath = `Images/${randomString(12)}.jpg`
        storage_UploadMedia(chosenImage, imagePath, async (success) => {
            if (success) {
                const geohash = ngeohash.encode(lat, lng);

                const body = {
                    amount: Math.floor(views * (chosenOption === "1 x 1" ? size1Cost : chosenOption === "2 x 1" ? size2Cost : size3Cost) * 100),
                    currency: 'usd',
                    itemName: `${views} views`,
                    itemDescription: `${chosenOption} ad.`,
                    args: {
                        active: true,
                        userId: me.id,
                        views: parseInt(views),
                        chosenOption: chosenOption,
                        imagePath: imagePath,
                        date: parseInt(Date.now()),
                        isCoupon: Boolean(isCoupon),
                        expDate: isCoupon ? parseInt(expDate.getTime()) : 0,
                        isRepeating: Boolean(isRepeating),
                        geohash: geohash,
                        address: address,
                        category: me.category
                    }
                }
                // 
                const res = await server_POST('create-payment-link', body);
                setLoading(false);
                // MAYBE CHANGE TO ADS
                navigate('/campaigns')
                window.open(`${res.url}`, "_blank")
            }
        });
    }

    // Initialize the Autocomplete when the component is mounted and Google Maps is loaded
    useEffect(() => {
        window.scrollTo(0, 0)
        auth_CheckSignedIn((person) => {
            firebase_GetDocument('KoukokuAds_Businesses', person.id, (userDoc) => {
                setMe(userDoc);
            })
        }, navigate)
        if (isLoaded && autocompleteRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);
            autocomplete.setFields(['geometry', 'formatted_address']); // Specify the required data

            // Listener for when a place is selected
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const location = place.geometry.location;
                    setLat(location.lat());
                    setLng(location.lng());
                    setAddress(place.formatted_address);
                }
            });
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return <Loading />;
    }


    return (
        <div className="poppins">
            {loading && <Loading />}
            {showDialog && <Dialog title={'Submit for review'} message={'Are you sure you want to submit this ad for review? You will be redirected to the payment page.'} btnText={'Submit'} func={onSubmitReview} setToggle={setShowDialog} />}
            <DashNavigation />
            <div className='main'>
                {/* TOP */}
                <br />
                <h1 className='create-title'>Let’s turn your ads into earnings!</h1>
                <Spacer height={5} />
                <p className='create-desc'>
                    Creating an ad with us is simple, affordable, and gives you the creative freedom you need to make your business stand out.
                    We encourage you to design and post any ad you want, as long as it’s appropriate and community-friendly! Your ad will be
                    shared with the entire community, so it’s important to ensure that it remains positive and professional to attract more
                    customers. Just upload your image in one of the three available sizes, and be sure it fits perfectly within the provided
                    dimensions. This will ensure your ad looks great and gets the attention it deserves!
                </p>
                <Spacer height={50} />

                {/* DIMENSIONS */}
                <h1 className='create-step'>1. Pick your ad size</h1>
                <Spacer height={30} />
                <div className='create-options-wrap'>
                    <div className='create-options'>
                        <Clickable onPress={() => handleOptionClick("1 x 1")}>
                            <div className={`create-option text-center no-wrap ${chosenOption === "1 x 1" ? 'create-option-chosen' : ''}`}>
                                <p>1 x 1</p>
                                <p className='xsmall-text'>( ${size1Cost.toString()} )</p>
                            </div>
                        </Clickable>
                        <Clickable onPress={() => handleOptionClick("2 x 1")}>
                            <div className={`create-option text-center no-wrap ${chosenOption === "2 x 1" ? 'create-option-chosen' : ''}`}>
                                <p>2 x 1</p>
                                <p className='xsmall-text'>( ${size2Cost.toString()} )</p>
                            </div>
                        </Clickable>
                        <Clickable onPress={() => handleOptionClick("2 x 2")}>
                            <div className={`create-option text-center no-wrap ${chosenOption === "2 x 2" ? 'create-option-chosen' : ''}`}>
                                <p>2 x 2</p>
                                <p className='xsmall-text'>( ${size3Cost.toString()} )</p>
                            </div>
                        </Clickable>
                    </div>

                    <div className='horizontal-center full-width'>
                        <div className='fit-content'>
                            <div>
                                <h2 className='create-label'>{chosenOption} units</h2>
                            </div>
                            <Spacer height={10} />
                            <Clickable onPress={handleUploadClick}>
                                {chosenImage === null ? (
                                    <div className={`create-upload-${chosenOption == "1 x 1" ? "1-1" : chosenOption == "2 x 1" ? "2-1" : "2-2"} vertical-center`}>
                                        <div className='horizontal-center'>
                                            <MdAddPhotoAlternate className='create-icon' />
                                        </div>
                                    </div>
                                ) : (
                                    <img key={chosenOption} className={`create-upload-${chosenOption == "1 x 1" ? "1-1" : chosenOption == "2 x 1" ? "2-1" : "2-2"}`} src={chosenImage} />
                                )}
                            </Clickable>
                            <p className='text-center small-text'>tap to change</p>
                        </div>
                    </div>
                </div>

                {/* INPUT */}
                <input
                    type='file'
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={onChooseImage}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                />
                <Spacer height={20} />
                <div className='horizontal-center'>
                    <div className='create-note-wrap'>
                        <FaRegHandSpock className='create-note-icon' />
                        <p className='create-note'>1 unit is half of the phone screen width.</p>
                    </div>
                </div>
                <Spacer height={20} />
                <Divider thickness={1} color={'#9AA5CE'} />
                <Spacer height={20} />

                {/* VIEWS */}
                <h1 className='create-step'>2. Select # of views</h1>
                <Spacer height={30} />
                <div className='horizontal-center'>
                    <div className='create-note-wrap'>
                        <div className='create-note-icon'>
                            <FaRegHandSpock />
                        </div>

                        <p className='create-note'>An ad view is recorded when the ad is fully visible on a user’s screen. Once the selected view count is reached, the ad will be automatically removed unless additional views are purchased.</p>
                    </div>
                </div>
                <div className='horizontal-center'>
                    <select id='ddViews' className='dropdown'>
                        {viewOptions.map((views) => (
                            <option key={views}>
                                {`${views} views - $${getCost(views)}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* COUPON OPTION */}
                <Spacer height={20} />
                <Divider thickness={1} color={'#9AA5CE'} />
                <Spacer height={20} />
                <h1 className='create-step'>3. Coupon settings</h1>
                <Spacer height={20} />

                <div className='horizontal-center'>
                    <div className='create-note-wrap'>
                        <div className='create-note-icon'>
                            <FaRegHandSpock />
                        </div>

                        <p className='create-note'>If your ad features a discount, special offer, or deal requiring customer interaction, such as scanning or redeeming a coupon, please include an expiration date. Each customer will receive a unique QR code, enabling you to scan and capture their information.</p>
                    </div>

                </div>
                <div className='horizontal-center'>
                    <div className='create-form'>
                        <div className='h'>
                            <Checkbox onChange={(checked) => { setIsCoupon(!checked) }} backgroundColor={"red"} />
                            <h1 className='create-checktext' style={{ textDecoration: 'underline', textDecorationColor: 'red' }}>Remove coupon functionality</h1>
                        </div>
                        {isCoupon && <div>
                            <Spacer height={40} />
                            <p className='create-sub'>Provide an expiration date.</p>
                            <input
                                type="date"
                                id="dpExpiration"
                                className="datepicker"
                                min={new Date().toISOString().split("T")[0]} // Set today's date as the minimum
                            />
                            <Spacer height={20} />
                            <p className='create-sub'>Frequency</p>
                            <p className='create-caption'>By default, the coupon will be allowed to be scanned only one time. Checking the box below will allow multiple redemptions throughout its lifespan. You will have record of how many times the customer scans coupon.</p>
                            <Spacer height={10} />
                            <div className='h'>
                                <Checkbox onChange={(checked) => { setIsRepeating(checked) }} backgroundColor={"black"} />
                                <h1 className='create-checktext'>Allow customers to repeatedly use coupon.</h1>
                            </div>
                        </div>}
                    </div>
                </div>


                {/* ADDRESS */}

                <Spacer height={20} />
                <Divider thickness={1} color={'#9AA5CE'} />
                <Spacer height={20} />
                <h1 className='create-step'>4. Location of business or ad</h1>
                <Spacer height={20} />

                <div className='horizontal-center'>
                    <div>
                        <p className="label">address</p>
                        <div className="login-textfield">
                            <input
                                ref={autocompleteRef}  // Reference to the autocomplete input field
                                id="tbAddress"
                                type="text"
                                className="textfield"
                                value={address}
                                placeholder="Search for your address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className='create-map'>
                    <GoogleMap

                        mapContainerStyle={mapContainerStyle}
                        zoom={17}
                        center={center}
                    >
                        {lat && lng && <Marker position={{ lat, lng }} />}
                    </GoogleMap>
                </div>

                <Spacer height={20} />
                <Divider thickness={1} color={'#9AA5CE'} />
                <Spacer height={20} />

                <h1 className='create-step'>5. Submit for review</h1>
                <Spacer height={20} />
                {/* PAY */}
                <div className='horizontal-center'>
                    <div className='create-note-wrap'>
                        <div className='create-note-icon'>
                            <FaRegHandSpock />
                        </div>

                        <p className='create-note'>Upon payment, your ad will be submitted for review. If approved, it will be posted automatically, and you’ll receive a confirmation email. If your ad is rejected, a full refund will be issued, and the ad will not be posted.</p>
                    </div>
                </div>

                <div className='create-pay-wrap horizontal-center'>
                    <Clickable onPress={() => {
                        if (chosenImage == null) {
                            alert("Please upload an ad to continue.");
                            return;
                        }
                        setShowDialog(true);
                    }}>
                        <div className='create-pay'>
                            <p>Submit For Review</p>
                        </div>
                    </Clickable>
                </div>
                <Spacer height={100} />
            </div>
            <Footer />
        </div>
    );
}