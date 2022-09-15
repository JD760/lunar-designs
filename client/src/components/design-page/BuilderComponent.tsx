import "./BuilderComponent.css";

interface BuilderComponentProps {
    numBeads: number
}

function BuilderComponent (props: BuilderComponentProps) {
    let braceletBeads: JSX.Element[] = [];
    
    for(let i = 0; i < props.numBeads; i++) {
        braceletBeads.push(
            <div>
            <div className="bracelet-bead center" key={i}>
                {i + 1}
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

