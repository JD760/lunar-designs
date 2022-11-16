import { useState } from "react";
import "./style/ToggleSwitchComponent.css";

interface ToggleSwitchProps {}

function ToggleSwitchComponent (props: ToggleSwitchProps) {
    const [switchEnabled, setSwitchEnabled] = useState(false);

    return (
        <label className="toggle-switch">
            <input 
                type="checkbox"
                defaultChecked={switchEnabled}
                onChange={() => setSwitchEnabled}
            ></input>
            <span className="toggle-switch-slider round"></span>
        </label>
    )
}

export default ToggleSwitchComponent;