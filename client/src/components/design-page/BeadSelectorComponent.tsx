// import other components and react functions for state management
import './style/BeadSelectorComponent.css';

// only populated if properties are passed into the beadSelector
type BeadSelectorProps = {
    selectorIsLoading: boolean
    itemElements: JSX.Element[]
}

// react components may be functions or classes, functions are often
// preferred as they are more simple to read and understand
function BeadSelectorComponent (props: BeadSelectorProps) {
    /* Fetching from the backend may take several seconds, using a loading animation */
    // conditionally render HTML - render a loading animation until the selector is ready
    if (props.selectorIsLoading) {
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
                    {props.itemElements}
                </ul>
            </div>
        )
    }
}

export default BeadSelectorComponent;