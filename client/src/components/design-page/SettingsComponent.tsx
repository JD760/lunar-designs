// import the CSS rules for styling the component
import { useState } from 'react';
import { braceletSettings } from '../../utility/types';
import './style/SettingsComponent.css';


interface SettingsComponentProps {
    settings: braceletSettings
    setSettings: Function
}

function SettingsComponent (props: SettingsComponentProps) {
    
    return (
        <div className="settings-component">
            <p className="center"><u>Settings</u></p>
            <div className="bracelet-size">
                <label htmlFor="size-setting">Bracelet Size:  </label>
                <select name="size-setting" onChange={(event) => props.setSettings({size: event.target.value})}>
                    <option value={24}>Large</option>
                    {/* using the selected=true attribute means medium is the default setting*/}
                    <option value={20} selected={true}>Medium</option>
                    <option value={16}>Small</option>
                </select>
            </div>
            {/* br elements create vertical spacing to make the UI more readable */}
            <br/>
            <div className="thread-colour">
                <label htmlFor="thread-colours">Thread Colour:  </label>
                <select name="thread-colours">
                    <option value="black" selected={true}>Black</option>
                    <option value="clear">Clear</option>
                </select>
            </div>
            <br/>
            <div className="">

            </div>
        </div>
    )
}

// export the settings component as a function so it may be used in the DesignPageComponent
export default SettingsComponent;