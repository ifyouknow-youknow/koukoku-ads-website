import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import { Spacer } from './UTILITIES/Spacer'
import '../STYLES/Login.css'
import { Clickable } from "./UTILITIES/Clickable";
import { auth_SignIn } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loading } from "./UTILITIES/Loading";

export function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function onSignIn() {
        const email = document.querySelector("#tbEmail").value;
        const password = document.querySelector("#tbPassword").value;

        if (email == "" || password == "") {
            alert("PLease provide a valid email and password.");
            return
        }

        setLoading(true);

        auth_SignIn(email, password, (success) => {
            setLoading(false);
            if (success) {
                navigate('/dashboard');
            }
        })
    }

    return <div className="poppins">
        {loading && <Loading />}
        <Navigation />
        <div className="main vertical-center">
            <div className="horizontal-center">
                <div>
                    <h1 className="login-title">Login</h1>
                    <br />
                    <p className="label">email</p>
                    <div className="login-textfield">
                        <input id="tbEmail" type="text" className="textfield" placeholder="jdoe@gmail.com" />
                    </div>
                    <Spacer height={10} />
                    <p className="label">password</p>
                    <div className="login-textfield">
                        <input id="tbPassword" type="password" className="textfield" placeholder="jdoe@gmail.com" />
                    </div>

                    <Spacer height={10} />
                    <div className="right">
                        <Clickable onPress={onSignIn}>
                            <div className="login-btn bg-red">
                                login
                            </div>
                        </Clickable>
                    </div>
                    <Spacer height={10} />
                    <div className="horizontal-center">
                        <Clickable>forgot password?</Clickable>
                    </div>
                </div>
            </div>

        </div>
        <Footer />
    </div>
}