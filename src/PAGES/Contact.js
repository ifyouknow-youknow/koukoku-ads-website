import { Footer } from "./UTILITIES/Footer";
import { Navigation } from "./UTILITIES/Navigation";
import '../STYLES/Contact.css'
import { Spacer } from "./UTILITIES/Spacer";
import { firebase_CreateDocument } from "../firebase";
import { randomString } from "../functions";

export function Contact() {

    function onSubmit() {
        const businessName = document.querySelector("#tbBusinessName").value;
        const contactName = document.querySelector("#tbContactName").value;
        const email = document.querySelector("#tbEmail").value;
        const address = document.querySelector("#tbAddress").value;
        const details = document.querySelector("#taDetails").value;
        if (businessName == "" || contactName == "" || email == "" || address == "" || details == "") {
            alert("Please provide info for all fields.");
            return;
        }

        const args = {
            businessName: businessName,
            contactName: contactName,
            email: email,
            address: address,
            details: details.replaceAll("\n", "jjj")
        }

        firebase_CreateDocument("AdsMahem_Entries", randomString(25), args, (success) => {

            document.querySelector("#tbBusinessName").value = "";
            document.querySelector("#tbContactName").value = "";
            document.querySelector("#tbEmail").value = "";
            document.querySelector("#tbAddress").value = "";
            document.querySelector("#taDetails").value = "";

            if (success) {
                alert("Your submission has been sent. We will email you shortly.")
                return;
            } else {
                alert("There was a problem with your submission. Please try again later.");
                return;
            }
        })

    }

    return <div className="poppins">
        <Navigation />

        <div className="main">
            <div className="p constrain">
                <h1 className="page-main-title">Contact Us</h1>
                <p className="page-main-text">Fill out this form to tell us how you’d like your first ad to look. We’ll set up your new account and even create your first ad for you!</p>
                <br />
                <h4>You can also contact us at <b>bagel.inbox@gmail.com</b></h4>
                <Spacer height={40} />
                <div className="form">
                    <p>business name</p>
                    <input type="text" id="tbBusinessName" className="textfield" placeholder="ex. Burger Bros Shop" />
                    <br />
                    <br />
                    <p>contact name</p>
                    <input type="text" id="tbContactName" className="textfield" placeholder="ex. John Doe" />
                    <br />
                    <br />
                    <p>email</p>
                    <input type="email" id="tbEmail" className="textfield" placeholder="ex. jdoe@gmail.com" />
                    <br />
                    <br />
                    <p>address</p>
                    <input type="text" id="tbAddress" className="textfield" placeholder="ex. 1234 Commercial St. San Frantokyo, TA 12345" />
                    <br />
                    <br />
                    <p>first ad details</p>
                    <textarea id="taDetails" className="textarea poppins" placeholder="Enter details of wwhat you want to display on your first ad. (deals, promos, hiring, discounts, etc.)"></textarea>
                    <div className="separate-h">
                        <div></div>
                        <button onClick={() => onSubmit()} className="button bg-blue pointer">submit</button>
                    </div>
                </div>
            </div>

        </div>

        <Footer />

    </div>
}