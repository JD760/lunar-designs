// imports CSS for styling but will also import other components (builder, selector etc) and
// necessary functions from the react library
import "./DesignPageComponent.css"


/* DesignPageComponent represents the entire page containing the builder, selector, settings etc*/
function DesignPageComponent(): JSX.Element {
    return(
        <div className="mainpage-container flex-container">
            <div className="about-container flex-item">
                AboutComponent
            </div>
            <div className="settings-container flex-item">
                SettingsComponent
            </div>
            <div className="builder-container flex-item">
                BuilderComponent
            </div>
            <div className="selector-container flex-item">
                BeadSelectorComponent
            </div>
        </div>
    )
}

// export the Component as a TypeScript module, allowing it to be used in other pages/components
export default DesignPageComponent;

