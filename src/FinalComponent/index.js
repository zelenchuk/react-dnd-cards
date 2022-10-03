import './index.css'
import React, {useEffect, useState} from "react";
import Droppable from "./Droppable";

const FinalComponent = () => {
    const [place1, setPlace1] = useState([]);
    const [place2, setPlace2] = useState([]);

    // items pool (all items for all places)
    const [items, setItems] = useState([{itemID: 1}, {itemID: 2}, {itemID: 3}, {itemID: 4}, {itemID: 5}]);

    useEffect(() => {
        console.log('place1', place1);
        console.log("items", items);
    }, [place1]);

    return (
        <>
            <div id="droppableBlock">
                <div id={'place-1'}>
                    <h2>Hard code Place #1</h2>

                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.target.classList.add('onDragOver')
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault();
                            e.target.classList.remove('onDragOver')
                        }}
                        onDrop={(e, target) => {
                            e.preventDefault();


                            // TODO need to check class drop element's, because we can drop anythings ... it's not good.
                            // if (target.classList.contains('newItemsStyle')) {}
                            e.target.classList.remove('onDragOver')
                            console.log("on me something drop");
                            const data = e.dataTransfer.getData("text/html");
                            //alert(data);

                            setPlace1([...place1, {itemID: parseInt(data)}]);
                            setItems(items.filter(i => i.itemID !== parseInt(data)));
                        }}
                        className="placeDropBody">
                        {place1.length > 0 && (
                            <section>
                                {place1.map((i, index) =>
                                    <div
                                        className={'inPlaceItems'}
                                        key={index}
                                        id={i.itemID}
                                        draggable
                                        onDragStart={e => e.dataTransfer.setData('Text/html', e.target.id)}
                                        onDrop={(event) => {
                                            event.preventDefault();
                                        }}
                                    >
                                        {i.itemID}
                                    </div>)}
                            </section>
                        )}

                    </div>


                </div>

                <Droppable title={"New dynamic place #1"} items={items} setItems={setItems}/>

                <Droppable title={"New dynamic place #2"} items={items} setItems={setItems}/>

                <Droppable title={"New dynamic place #3"} items={items} setItems={setItems}/>
            </div>

            <div id="itemsBlock">
                {items.map((i) => <p
                    key={i.itemID}
                    id={i.itemID}
                    draggable
                    onDragStart={e => e.dataTransfer.setData('Text/html', e.target.id)}
                    onDrop={(event) => {
                        event.preventDefault();
                    }}

                    className={"newItemsStyle"}
                >
                    {i.itemID}
                </p>)}
            </div>
        </>
    );
}


export default FinalComponent;