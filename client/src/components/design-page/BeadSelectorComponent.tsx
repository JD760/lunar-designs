import { useEffect, useState } from 'react';
import './styles/BeadSelectorComponent.css';
import SelectorItemComponent from './SelectorItemComponent';

type BeadSelectorProps = {
    
}

function BeadSelectorComponent (props: BeadSelectorProps) {
    const [selectorIsLoading, setSelectorIsLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [elementsCreated, setElementsCreated] = useState(false);
    const [itemElements, setItemElements] = useState<JSX.Element[]>([]);

    /* Fetch stock data from the backend - runs only once similarly to componentDidMount */
    useEffect(() => {
        fetch("http://localhost:3001/api/stockinfo", {method: "get"})
        .then((response) => {
            if (!response.ok) {throw new Error(`HTTP Error: $(response.status)`)}
            return response.json();
        })
        .then((resData) => {
            let data: any = Object.values(resData.items);
            setData(data)
            setDataFetched(true);
        })
        .catch((err) => {
            console.log(err.message)
            setData("{}");
        })
    }, [])

    useEffect(() => {
        if (!elementsCreated && dataFetched) {
            let itemElements: JSX.Element[] = []

            for (let i = 0; i < data.length; i++) {
                let item: any = Object.values(data[i]);
                itemElements.push(
                    <SelectorItemComponent id={item[0]} name={item[1]} description={item[2]} img={item[3]}/>
                )
            }

            setItemElements(itemElements);

            setElementsCreated(true);
            setSelectorIsLoading(false);
        }
    }, [setElementsCreated, elementsCreated, data, dataFetched])
    /* Fetching from the backend may take several seconds, using a loading animation */
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
                <ul className="selector-items">
                    {itemElements}
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                    <li className="selector-item"/>
                </ul>
            </div>
        )
    }
}

export default BeadSelectorComponent;