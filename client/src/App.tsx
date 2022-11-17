import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { Routes, Route } from "react-router-dom";

import DesignPageComponent from './components/design-page/DesignPageComponent';
import AdminLoginComponent from './components/admin-dashboard/AdminLoginComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';
import AdminDashboardComponent from './components/admin-dashboard/AdminDashboardComponent';

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
    const [sessionID, setSessionID] = useState<number>(0);
    const [loggedIn, setLoggedIn] = useState(false)

    // fetch the session cookie or create a new cookie if it does not exist yet
    useEffect(() => handleSession(setSessionID), [sessionID]);
    useEffect(() => console.log(loggedIn));

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DesignPageComponent/>}/>
                <Route
                    path="/admin"
                    element={loggedIn ? <AdminDashboardComponent /> : <AdminLoginComponent setLoggedIn={setLoggedIn} sessionID={sessionID}/>}
                />
                {/* must be last in the list of routes */}
                <Route path="*" element={<PageNotFoundComponent />}/>
            </Routes>
        </div>
    );
}

export default App;