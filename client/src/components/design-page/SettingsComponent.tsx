// import the CSS rules for styling the component
import { useState } from 'react';
import './style/SettingsComponent.css';
import ToggleSwitchComponent from "./ToggleSwitchComponent";
// no props passed as the settings component has no functionality in prototype 1
interface SettingsComponentProps {}

type threadStyle = {
    type: string,
    colour: string
}

function SettingsComponent (props: SettingsComponentProps) {
    const [threadStyle, setThreadStyle] = useState<threadStyle>({type: "", colour: ""});
    
    return (
        <div className="settings-component">
            <p className="center"><u>Settings</u></p>
            <div className="thread-style">
                <p>Thread Colour: </p>
                <select className="thread-colour-selector">
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="clear">Clear</option>
                </select>
            </div>
        </div>
    )
}

// export the settings component as a function so it may be used in the DesignPageComponent
export default SettingsComponent;