import { useEffect, useState } from "react";
import { beadItem } from "../../utility/types";
import "./style/BuilderComponent.css";

interface BuilderComponentProps {
    numBeads: number,
    selectedBeads: string[],
    itemElements: JSX.Element[]
}

function BuilderComponent (props: BuilderComponentProps) {

    let braceletBeads: JSX.Element[] = [];
    
    for(let i = 0; i < props.numBeads; i++) {
        braceletBeads.push(
            <div key={i}>
            <div className="bracelet-bead center">
                {props.selectedBeads[i] !== "" ?
                <img width="32px" height="32px" src={props.selectedBeads[i]} alt=""/>
                :
                <img width="32px" height="32px" src="img/placeholder.jpg" alt=""/>}
            </div>
            </div>
        )
    }

    return(
        <div className="builder-component">
            <div className="bracelet-container">
                {braceletBeads}
            </div>
        </div>
    )
}

export default BuilderComponent;

