// import the CSS rules for styling the component contents
import "./AboutComponent.css";


// about component is purely informational so has no props
function AboutComponent () {
    return(
        // the div with the about class contains all content in the component
        <div className="about">
            <p className="center"><u>About</u></p>
            <p className="about-text">
                Welcome to the Lunar Designs bracelet builder. Use the settings
                menu to customise properties of the bracelet and enable accessibility
                features.
            </p>
            <p className="about-text">
                Use the bead selector to choose beads that you like, hover to to see 
                more information and click the magnifying glass for a closeup view.
                As you select beads, they will appear in the builder menu and can be rearranged.
            </p>

            <p className="info-text center">
                Lunar Designs - 2022
            </p>
        </div>
    )
}

// export the component as a function, allowing it to be used as part of the DesignPageComponent
export default AboutComponent;  

