// import CSS for styling the bead items
import "./SelectorItemComponent.css";

// these fields are retrieved from the backend and passed into this component
interface SelectorItemProps {
    id: number,
    name: string,
    description: string,
    img: string, // path to the item's image
}
/*
    The selector item component represents an item in the bead selector that a user
    can hover over to view information and click on to add it to the builder
*/
function SelectorItemComponent (props: SelectorItemProps) {
    return (
        <li className="selector-item"
            key={props.id} // the key is a unique identifier for the items in the list
        >
            <img className="overlay-image" src={`http://localhost:3001/${props.img}`} alt={`${props.name}`}/>
            <div className="overlay">
                <div className="text">{props.name}</div>
                <p className="overlay-description">{props.description}</p>
            </div>

        </li>

    )
}

export default SelectorItemComponent;
