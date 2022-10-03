import React, {useState} from 'react';

const Droppable = (props) => {
    const {title, items, setItems} = props;
    const [placeItems, setPlaceItems] = useState([]);

    return (
        <>

            <div id={'place-1'}>
                <h2>{title}</h2>

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


                        const itemID = parseInt(e.dataTransfer.getData("text/html"));

                        const isExistInItems = items.find(i => i.itemID === itemID);
                        // This condition decide not re-dragging items if this not exist.
                        // It's means they are in use.
                        if (!!isExistInItems) {
                            console.log("item exist in items");
                            setPlaceItems([...placeItems, {itemID: itemID}]);// update current place
                            setItems(items.filter(i => i.itemID !== itemID));// update global items

                        } else {
                            console.log("item not exist in items");
                        }


                        // This condition canceled repeats twins-elements in place pool. But make possible the have
                        // items copies in any (Droppable) place.
                        const isExistInThisPlacePool = placeItems.find(i => i.itemID === itemID);
                        if (!!!isExistInThisPlacePool) {
                            console.log("item not exist in placeItems");
                            setPlaceItems([...placeItems, {itemID: itemID}]);// update current place
                            setItems(items.filter(i => i.itemID !== itemID));// update global items
                        }


                    }}
                    className="placeDropBody">
                    {placeItems.length > 0 && (
                        <section>
                            {placeItems.map((i, index) =>
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

        </>
    );
}

export default Droppable;