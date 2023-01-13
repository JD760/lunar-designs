// imports CSS for styling but will also import other components (builder, selector etc) and
// necessary functions from the react library
import AboutComponent from "./AboutComponent";
import SettingsComponent from "./SettingsComponent";
import BeadSelectorComponent from "./BeadSelectorComponent";
import BuilderComponent from "./BuilderComponent";
import SelectorItemComponent from './SelectorItemComponent';
import "./style/DesignPageComponent.css"
import { useState, useEffect } from "react";
import { beadItem, braceletSettings } from "../../utility/types"

// data passed in from the root component which needs to be shared with other components
// setSelectedBeadIDs links to the function defined to update the IDs in the root component
interface DesignPageComponentProps {
    selectedBeadIDs: string[]
    setSelectedBeadIDs: Function
    settings: braceletSettings,
    setSettings: Function
}

/* DesignPageComponent represents the entire page containing the builder, selector, settings etc*/
function DesignPageComponent(props: DesignPageComponentProps): JSX.Element {
    // create state objects, used to persist data as the page is changed and reloaded
    const [selectorIsLoading, setSelectorIsLoading] = useState(true);
    const [itemElements, setItemElements] = useState<JSX.Element[]>([]);
    const [selectedBeadImgs, setSelectedBeadImgs] = useState<string[]>([])

    useEffect(() => {
        console.log("Selected: ", props.selectedBeadIDs);
    }, [props.selectedBeadIDs])

    /* Fetch stock data from the backend - runs only once similarly to componentDidMount */
    useEffect(() => {
        // handle a click event on the bead item
        // takes in the ID and image URL of the clicked item as parameters
        const beadItemClick = (id: string, img: string) => {
            // log the item details for testing purposes
            console.log("Clicked: ", id, " img: ", img);
            // same effect as array.push(newElement), adds a new image and ID to the respective arrays
            setSelectedBeadImgs([...selectedBeadImgs, img]);
            props.setSelectedBeadIDs([...props.selectedBeadIDs, id]);
        }
        // create an asynchronous function that blocks execution while it waits for a process
        const fetchStock = async () => {
            const response = await fetch("http://localhost:3001/api/stockinfo", {method: "get"});
            // generate a HTTP error if one occurs
            if (!response.ok) {throw new Error("HTTP Error: " + response.status.toString())}
            const beadItems: beadItem[] = await response.json();
            
            /* create and populate bead item templates */
            // create an empty array of HTML elements
            let itemElements: JSX.Element[] = []

            // iterate over each bead item received from the backend
            for (let i = 0; i < beadItems.length; i++) {
                let item: beadItem = beadItems[i];
                itemElements.push(
                    // create a new template and populate it with the item data
                    <SelectorItemComponent
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        img={item.img}
                        onClick={beadItemClick}
                        key={i}
                    />
                )
            }
            // update the component state
            setItemElements(itemElements);
            setSelectorIsLoading(false);
        }
        if (selectorIsLoading) {
            fetchStock();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="mainpage-container flex-container">
            <div className="settings-container flex-item">
                <SettingsComponent
                    settings={props.settings}
                    setSettings={props.setSettings}
                />
            </div>
            <div className="about-container flex-item">
                <AboutComponent />
            </div>
            <div className="builder-container flex-item">
                <BuilderComponent
                    numBeads={props.settings.size}
                    selectedBeads={selectedBeadImgs}
                    itemElements={itemElements}
                />
            </div>
            <div className="selector-container flex-item">
                <BeadSelectorComponent
                    selectorIsLoading={selectorIsLoading}
                    itemElements={itemElements}   
                />
            </div>
        </div>
    )
}

// export the Component as a TypeScript module, allowing it to be used in other pages/components
export default DesignPageComponent;

