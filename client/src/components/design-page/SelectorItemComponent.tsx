import { useState } from "react";

interface SelectorItemProps {
    id: number,
    name: string,
    description: string,
    img: string, // path to the item's image
}

function SelectorItemComponent (props: SelectorItemProps) {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <li className="selector-item"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
        >
            <img src={`http://localhost:3001/${props.img}`} alt={`${props.name}`}/>
            {showOverlay && (
                <div>Overlay Enabled</div>
            )}
        </li>

    )
}

export default SelectorItemComponent;