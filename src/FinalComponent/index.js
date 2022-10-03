import './index.css'
import React, {useState, useEffect} from "react";
import Droppable from "./Droppable";

const initialState = [{itemID: 1}, {itemID: 2}, {itemID: 3}, {itemID: 4}, {itemID: 5}, {itemID: 6}];

const FinalComponent = () => {
    // items pool (all items for all places)
    const [items, setItems] = useState(initialState);

    // const [checkbox, setCheckbox] = useState(false);

    // // This piece of code show workflow with API data
    // const loadDataFromAPI = async () => await fetch('https://swapi.dev/api/people');
    //
    // useEffect(() => {
    //     if (checkbox) {
    //         loadDataFromAPI()
    //             .then(data => data.json())
    //             .then(result => setItems(result.results))
    //             .catch(error => console.log(error));
    //     } else {
    //         setItems(initialState);
    //     }
    //
    // }, [checkbox])

    return (
        <>
            {/*<form>*/}
            {/*    <label htmlFor="apiToggler">*/}
            {/*        API data*/}
            {/*        <input id={"apiToggler"}*/}
            {/*               type="checkbox"*/}
            {/*               checked={checkbox}*/}
            {/*               onChange={() => setCheckbox(!checkbox)}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*</form>*/}


            <div id="droppableBlock">
                <Droppable title={"New dynamic place #1"} items={items} setItems={setItems}/>
                <Droppable title={"New dynamic place #2"} items={items} setItems={setItems}/>
            </div>

            {/* Draggable items block*/}
            <div id="itemsBlock">
                {items.map((i) =>
                    <p className={"newItemsStyle"}
                       draggable
                       key={i.itemID || i.name}
                       id={i.itemID || i.name}
                       onDragStart={e => e.dataTransfer.setData('Text/html', e.target.id)}
                       onDrop={(event) => event.preventDefault()}
                    >{i.itemID}</p>
                )}
            </div>
            {/* Draggable items block END*/}
        </>
    );
}


export default FinalComponent;