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
                        const data = e.dataTransfer.getData("text/html");
                        //alert(data);

                        setPlaceItems([...placeItems, {itemID: parseInt(data)}]);
                        setItems(items.filter(i => i.itemID !== parseInt(data)));
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