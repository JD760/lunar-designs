import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { Routes, Route } from "react-router-dom";

import DesignPageComponent from './components/design-page/DesignPageComponent';
import AdminLoginComponent from './components/admin-dashboard/AdminLoginComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';
import AdminDashboardComponent from './components/admin-dashboard/AdminDashboardComponent';
import CheckoutPageComponent from './components/checkout-page/CheckoutPageComponent';

import { braceletSettings } from './utility/types';
const handleSession = (setSessionID: React.Dispatch<React.SetStateAction<number>>) => {
    const cookies = new Cookies();
    const cookiesList = cookies.getAll();

    if (cookiesList["session-cookie"]) {
        // retrieve existing session ID
        setSessionID(cookiesList["session-cookie"]);
    } else {
        // generate new session ID
        const sessionID = Date.now() * Math.floor(Math.random() * 100);
        cookies.set("session-cookie", sessionID, {
            path: "/",
            sameSite: "lax",
        });
        setSessionID(sessionID);
    }
}

function App() {
    // assign default values to the settings the bracelet has, the user can change these through the settings component
    // (a child component of the design page)
    const defaultSettings: braceletSettings = {
        size: 20,
        threadColour: "Black",
        threadType: "Elastic"
    }

    const [sessionID, setSessionID] = useState<number>(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedBeadIDs, setSelectedBeadIDs] = useState<string[]>([]);
    const [braceletSettings, setBraceletSettings] = useState<braceletSettings>(defaultSettings);

    // create a function to allow the design page to update the selected beads
    const updateSelectedBeads = (id: string) => {
        setSelectedBeadIDs([...selectedBeadIDs, id]);
    }
    // function to allow child components to update the settings state 
    const setSettings = (settings: braceletSettings) => {
        setBraceletSettings(settings);
    }
    // fetch the session cookie or create a new cookie if it does not exist yet
    useEffect(() => handleSession(setSessionID), [sessionID]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DesignPageComponent 
                    selectedBeadIDs={selectedBeadIDs}
                    setSelectedBeadIDs={updateSelectedBeads}
                    settings={braceletSettings}
                    setSettings={setSettings}
                />}/>
                <Route
                    path="/admin"
                    element={loggedIn ? <AdminDashboardComponent /> : <AdminLoginComponent setLoggedIn={setLoggedIn} sessionID={sessionID}/>}
                />
                <Route path='/checkout' 
                    element={<CheckoutPageComponent 
                        price={15}
                        shippingCost={2.5}
                        selectedBeadIDs={selectedBeadIDs}
                        settings={braceletSettings}
                    />}
                />
                {/* must be last in the list of routes */}
                <Route path="*" element={<PageNotFoundComponent />}/>
            </Routes>
        </div>
    );
}

export default App;

