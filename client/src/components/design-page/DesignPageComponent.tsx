// imports CSS for styling but will also import other components (builder, selector etc) and
// necessary functions from the react library
import AboutComponent from "./AboutComponent";
import SettingsComponent from "./SettingsComponent";
import BeadSelectorComponent from "./BeadSelectorComponent";
import BuilderComponent from "./BuilderComponent";
import "./DesignPageComponent.css"



/* DesignPageComponent represents the entire page containing the builder, selector, settings etc*/
function DesignPageComponent(): JSX.Element {
    return(
        <div className="mainpage-container flex-container">
            <div className="settings-container flex-item">
                <SettingsComponent />
            </div>
            <div className="about-container flex-item">
                <AboutComponent />
            </div>
            <div className="builder-container flex-item">
                <BuilderComponent numBeads={25} />
            </div>
            <div className="selector-container flex-item">
                <BeadSelectorComponent />
            </div>
        </div>
    )
}

// export the Component as a TypeScript module, allowing it to be used in other pages/components
export default DesignPageComponent;

