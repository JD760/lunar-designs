// import the CSS rules for styling the component
import './SettingsComponent.css';

// no props passed as the settings component has no functionality in prototype 1
interface SettingsComponentProps {}

function SettingsComponent (props: SettingsComponentProps) {
    return (
        <div className="settings-component">
            <p className="center"><u>Settings</u></p>
            <div className="thread-type">
                <p>Thread Type: </p>
            </div>
            <div>
                <p>Thread Colour:</p>
            </div>
            <div>
                <p>Bracelet Size: </p>
            </div>
            <div>
                <p>Dark Mode: </p>
            </div>
            <div className="accessibility">
                <p>Accessibility Features: </p>
            </div>
        </div>
    )
}

// export the settings component as a function so it may be used in the DesignPageComponent
export default SettingsComponent;
