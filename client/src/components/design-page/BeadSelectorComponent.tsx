// import other components and react functions for state management
import { useEffect, useState } from 'react';
import './BeadSelectorComponent.css';
import SelectorItemComponent from './SelectorItemComponent';

// only populated if properties are passed into the beadSelector
type BeadSelectorProps = {}

// react components may be functions or classes, functions are often
// preferred as they are more simple to read and understand
function BeadSelectorComponent (props: BeadSelectorProps) {
    // create state objects, used to persist data as the page is changed and reloaded
    const [selectorIsLoading, setSelectorIsLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [elementsCreated, setElementsCreated] = useState(false);
    const [itemElements, setItemElements] = useState<JSX.Element[]>([]);

    /* Fetch stock data from the backend - runs only once similarly to componentDidMount */
    useEffect(() => {
        // retrieve JSON from the backend
        fetch("http://localhost:3001/api/stockinfo", {method: "get"})
        .then((response) => {
            // throw an error if the server is down or unresponsive
            if (!response.ok) {throw new Error(`HTTP Error: $(response.status)`)}
            return response.json();
        })
        // update the componennt state with the JSON returned
        .then((resData) => {
            let data: any = Object.values(resData.items);
            setData(data);
            // setDataFetched allows the data processing function to run
            setDataFetched(true);
        })
        // if an error is thrown, log it to the browser console
        .catch((err) => {
            console.log(err.message)
            // if an error occurs, no data will be retrieved
            setData("{}");
        })
    }, [])

    
    useEffect(() => {
        // only trigger the event if JSON has been fetched and the HTML has not already been created
        if (!elementsCreated && dataFetched) {
            // create an array to store generated HTML in
            let itemElements: JSX.Element[] = []

            // for each bead item returned from the backend
            for (let i = 0; i < data.length; i++) {
                let item: any = Object.values(data[i]);
                itemElements.push(
                    // create a selector item, representing an item that the user can click on to 
                    // add to their bracelet
                    <SelectorItemComponent id={item[0]} name={item[1]} description={item[2]} img={item[3]}/>
                )
            }

            // update the state - itemElements is a local variable and would be lost if not
            // set as a state item
            setItemElements(itemElements);

            // prevent the function from executing multiple times
            setElementsCreated(true);
            // remove the loading animation from the selector and populate it with the item elements
            // that have been generated
            setSelectorIsLoading(false);
        }
    }, [setElementsCreated, elementsCreated, data, dataFetched])
    /* Fetching from the backend may take several seconds, using a loading animation */
    // conditionally render HTML - render a loading animation until the selector is ready
    if (selectorIsLoading) {
        return(
            <div className="selector-loading">
                <div className="loading-icon"></div>
            </div>
        )
    }
    else {
    /* When loading has finished, the selector can be populated and rendered */
        return (
            <div className="selector flex-container">
                <div className="selector-search">
                    <input id="selector-searchbar" placeholder="Find an item..."></input>
                    <button id="selector-filter">Filter</button>
                </div>
                <ul className="selector-items selector-list">
                    {itemElements}
                </ul>
            </div>
        )
    }
}

export default BeadSelectorComponent;