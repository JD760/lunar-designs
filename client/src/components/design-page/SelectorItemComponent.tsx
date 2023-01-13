// import CSS for styling the bead items
import "./style/SelectorItemComponent.css";

// these fields are retrieved from the backend and passed into this component
interface SelectorItemProps {
    id: string,
    name: string,
    description: string,
    img: string, // path to the item's image,
    onClick: Function,
}
/*
    The selector item component represents an item in the bead selector that a user
    can hover over to view information and click on to add it to the builder
*/
function SelectorItemComponent (props: SelectorItemProps) {
    return (
        <li className="selector-item"
            onClick={() => {props.onClick(props.id, props.img)}}
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
