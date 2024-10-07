import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import { Spacer } from './UTILITIES/Spacer';
import '../STYLES/Login.css';
import { Clickable } from "./UTILITIES/Clickable";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Loading } from "./UTILITIES/Loading";
import ngeohash from 'ngeohash';
import { auth_CreateUser, auth_SignIn, firebase_CreateDocument, firebase_GetAllDocuments } from "../firebase";
import { sortObjects } from "../functions";

export function Signup() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    function onSignUp() {
        const businessName = document.querySelector('#tbBusinessName').value;
        const email = document.querySelector('#tbEmail').value;
        const contactName = document.querySelector('#tbContactName').value;
        const category = document.querySelector('#ddCategory').value;
        const phone = document.querySelector('#tbPhone').value;
        const password = document.querySelector('#tbPassword').value;
        const passwordConf = document.querySelector('#tbPasswordConfirm').value;

        if (businessName == "" || email == "" || contactName == "" || phone == "" || password == "" || passwordConf == "" || category == "") {
            alert('Please fill out all fields of this form.');
            return;
        }

        if (password != passwordConf) {
            alert('Your passwords need to match to proceed.');
            return;
        }
        setLoading(true);
        const args = {
            email: email,
            contactName: contactName,
            phone: phone,
            name: businessName,
            category: category
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
    }

    useEffect(() => {
        const fetchCategories = async () => {
            await firebase_GetAllDocuments('KoukokuAds_Categories', (categs) => {
                setCategories(sortObjects(categs, 'category', 'asc').map((ting) => ting.category));
            });
        };

        fetchCategories();
    }, []);


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
                        <p className="label">category</p>
                        <div className="login-textfield">
                            <select id="ddCategory" className="dropdown">
                                {
                                    categories.map((cat, i) => {
                                        return (
                                            <option key={i}>
                                                {cat}
                                            </option>
                                        )
                                    })
                                }
                            </select>
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