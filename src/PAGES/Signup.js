import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import { Spacer } from './UTILITIES/Spacer';
import '../STYLES/Login.css';
import { Clickable } from "./UTILITIES/Clickable";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Loading } from "./UTILITIES/Loading";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ngeohash from 'ngeohash';
import { auth_CreateUser, auth_SignIn, firebase_CreateDocument } from "../firebase";

export function Signup() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
        height: '200px',
        borderRadius: '10px',
        marginTop: '10px'
    };

    const center = {
        lat: lat || 37.7749, // default latitude (San Francisco)
        lng: lng || -122.4194, // default longitude (San Francisco)
    };

    function onSignUp() {
        const businessName = document.querySelector('#tbBusinessName').value;
        const email = document.querySelector('#tbEmail').value;
        const contactName = document.querySelector('#tbContactName').value;
        const phone = document.querySelector('#tbPhone').value;
        const address = document.querySelector('#tbAddress').value;
        const password = document.querySelector('#tbPassword').value;
        const passwordConf = document.querySelector('#tbPasswordConfirm').value;

        if (businessName == "" || email == "" || contactName == "" || phone == "" || address == "" || password == "" || passwordConf == "") {
            alert('Please fill out all fields of this form.');
            return;
        }

        if (password != passwordConf) {
            alert('Your passwords need to match to proceed.');
            return;
        }
        setLoading(true);
        if (lat && lng) {
            const geohash = ngeohash.encode(lat, lng);  // Generate the geohash using lat and lng
            const args = {
                'address': address,
                'email': email,
                'contactName': contactName,
                'phone': phone,
                'geohash': geohash,
                'location': { latitude: lat, longitude: lng },
                'name': businessName
            }
            auth_CreateUser(email, password, (user) => {
                if (user != null) {
                    firebase_CreateDocument('KoukokuAds_Businesses', user.uid, args, (success) => {
                        if (success) {
                            setLoading(false);
                            auth_SignIn(email, password, (userThing) => {
                                navigate('/campaigns');
                            })
                        } else {
                            setLoading(false)
                            alert("There was a problem. Please try again later.")
                        }
                    })
                } else {
                    setLoading(false)
                    alert('Something went wrong. Please try again later.')
                }

            })
        } else {
            setLoading(false)
            alert('Please select an address.');
        }
    }

    // Initialize the Autocomplete when the component is mounted and Google Maps is loaded
    useEffect(() => {
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
            <Navigation />
            <div className="main vertical-center">
                <div className="horizontal-center">
                    <div>
                        <h1 className="login-title">Sign Up</h1>
                        <br />
                        <p className="label">business name</p>
                        <div className="login-textfield">
                            <input id="tbBusinessName" type="text" className="textfield" placeholder="ex. Koukoku Ads LLC" />
                        </div>
                        <Spacer height={10} />
                        <p className="label">email</p>
                        <div className="login-textfield">
                            <input id="tbEmail" type="email" className="textfield" placeholder="ex. jdoe@gmail.com" />
                        </div>
                        <Spacer height={10} />
                        <p className="label">contact name</p>
                        <div className="login-textfield">
                            <input id="tbContactName" type="text" className="textfield" placeholder="ex. John Doe" />
                        </div>
                        <Spacer height={10} />
                        <p className="label">phone</p>
                        <div className="login-textfield">
                            <input id="tbPhone" type="text" className="textfield" placeholder="ex. 1234567890" />
                        </div>
                        <Spacer height={10} />
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

                        {/* Map Section */}
                        <div>
                            <GoogleMap

                                mapContainerStyle={mapContainerStyle}
                                zoom={17}
                                center={center}
                            >
                                {lat && lng && <Marker position={{ lat, lng }} />}
                            </GoogleMap>
                        </div>
                        {/*  */}
                        <Spacer height={10} />
                        <p className="label">password</p>
                        <div className="login-textfield">
                            <input id="tbPassword" type="password" className="textfield" placeholder="8 characters max..." />
                        </div>
                        <Spacer height={10} />
                        <p className="label">confirm password</p>
                        <div className="login-textfield">
                            <input id="tbPasswordConfirm" type="password" className="textfield" placeholder="Passwords must match.." />
                        </div>
                        <Spacer height={10} />
                        <div className="right">
                            <Clickable onPress={() => {
                                onSignUp();
                            }}>
                                <div className="bg-blue button ">
                                    sign up
                                </div>
                            </Clickable>
                        </div>
                        <Spacer height={50} />
                        <br />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}