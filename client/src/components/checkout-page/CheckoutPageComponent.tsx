/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { braceletSettings } from "../../utility/types";
import "./CheckoutPageComponent.css";

interface CheckoutPageProps {
    price: number,
    shippingCost: number
    selectedBeadIDs: string[],
    settings: braceletSettings
}

export default function CheckoutPageComponent(props: CheckoutPageProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [streetAddress, setStreetAddress] = useState<string>("");
    const [postcode, setPostcode] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [validPostcode, setValidPostcode] = useState<boolean>(false);

    const [errorText, setErrorText] = useState<string>("");
    const [orderSent, setOrderSent] = useState<boolean>(false);

    const createOrder = async () => {
        // check that the e-mail and postcode are valid before proceeding
        if (!validEmail || !validPostcode) {
            setErrorText("Invalid E-mail or postcode")
            // if the email and postcode are invalid, exit the function before sending the order to the backend
            return;
        } else {
            setErrorText("");
        }

        const orderDetails = {
            // personal details of the user
            name: name,
            email: email,
            // shipping information
            streetAddress: streetAddress,
            postcode: postcode,
            city: city,
            // order price
            price: props.price + props.shippingCost,
            // order contents
            beads: props.selectedBeadIDs
        }
        console.log(orderDetails);
        const orderBody = JSON.stringify(orderDetails);
        await fetch("http://localhost:3001/api/neworder", 
            {method: "POST", headers: {"Content-Type": "application/json"}, body: orderBody}
        )
        // wait for a response to be returned by the backend and convert it to JSON
        .then((response) => response.json())
        // wait for the JSON conversion to complete then run the response handler
        .then((data) => {
            if (data.result === "Success") {
                setOrderSent(true)
            }
        })
    }


    // if the user clicks the checkout button with invalid details, the error text tells them of this
    // this removes the error when the details are corrected to be valid to avoid confusion
    useEffect(() => {
        if (validEmail && validPostcode) {
            setErrorText("")
        }
    }, [validEmail, validPostcode])

    useEffect(() => {
        const validateEmail = () => {
            /* Regular expressions allow a string to be tested to ensure that it meets certain criteria.
            This expression tests for a piece of text containing letters, numbers and special characters. It then
            requires that an @ symbol be present, followed by the domain section, separated with a period*/
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (email.match(validRegex)) {
                setValidEmail(true);
            } else {
                setValidEmail(false);
            }
        }
        validateEmail();
    }, [email])

    useEffect(() => {
        /* This regular expression checks for the format of a postcode, matching the requirements
           for a UK postcode as shown in the validation section */
        const postcodeRegex = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;

        if (postcode.match(postcodeRegex)) {
            setValidPostcode(true);
        } else {
            setValidPostcode(false);
        }
    }, [postcode])

    return(
        <div className="checkout-page">
            {/* This container uses a grid to space the name, address and price sections */}
            <div className="checkout-form-container checkout-grid">
                <div className="checkout-title">
                    <u>Order Checkout</u>
                </div>
                <div className="address-field">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={(event) => setName(event.target.value)}/>
                    <br/>
                    <label htmlFor="email">E-mail Address: </label>
                    <input type="text" name="email" onChange={(event) => setEmail(event.target.value)}/>
                    <br/>
                    <label htmlFor="street-address">Street Address: </label>
                    <input type="text" name="street-address" onChange={(event) => setStreetAddress(event.target.value)}/>
                    <br/>
                    <label htmlFor="postcode">Postal Code: </label>
                    <input type="text" name="postcode" onChange={(event) => setPostcode(event.target.value)}/>
                    <br/>
                    <label htmlFor="city">City: </label>
                    <input type="text" name="city"/>
                    {/* Create a vertical spacing  */}
                    <br/><br/>
                    {/* Display any errors that may occur */}
                    <p 
                        style={(orderSent) ? {color: "green"} : {color: "red"}}
                    >
                        {(orderSent) ? "Order Successful!" : errorText}   
                    </p>
                </div>
                <div className="price-field">
                    <p className="bracelet-price">Bracelet: £{props.price.toFixed(2)}</p>
                    <p className="shipping-cost">UK Shipping: £{props.shippingCost.toFixed(2)}</p>
                </div>
                <div className="submit-field">
                    <button type="submit" className="checkout-button" onClick={createOrder}>Checkout</button>
                </div>
            </div>
        </div>
    )
}