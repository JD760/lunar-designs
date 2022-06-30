import { useEffect, useState } from "react";
import '../styles/MainPageComponent.css';

type MainPageProps = {

}

function MainPageComponent(props: MainPageProps): JSX.Element {
    const [pageSize, setPageSize] = useState([0,0]);

    useEffect(() => {
        if (pageSize[0] !== window.innerWidth || pageSize[1] !== window.innerHeight) {
            setPageSize([window.innerWidth, window.innerHeight]);
        }
        console.log(pageSize);
    }, [pageSize])

    return(
        <div className="mainpage-container flex-container">
            <div className="about-container flex-item">
                about
            </div>
            <div className="settings-container flex-item">
                settings
            </div>
            <div className="builder-container flex-item">
                builder
            </div>
            <div className="selector-container flex-item">
                selector
            </div>
        </div>
    )
}

export default MainPageComponent;