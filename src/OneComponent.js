import React, {useState} from "react";


const initialState = [
    {placeID: 1, title: "Firstly", items: [{itemID: 1}]},
    {placeID: 2, title: "Second", items: [{itemID: 2}]},
    {placeID: 3, title: "Third", items: [{itemID: 3}]},
    {placeID: 4, title: "Fourth", items: [{itemID: 4}]},
    {placeID: 5, title: "Fifth", items: [{itemID: 5}]},
    {placeID: 6, title: "Sixth", items: [{itemID: 6}]},
];

const MainDND = () => {
    const [places, setPlaces] = useState(initialState);
    const [currentPlace, setCurrentPlace] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);


    const onDragOverHandler = (e) => {
        e.preventDefault();
        if (e.target.className === 'itemsElement') {
            e.target.style.boxShadow = '0 4px 3px gray';
            e.target.style.opacity = '.33';
        }
    }
    const onDragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none';
        e.target.style.opacity = '1';
    }
    const onDragStartHandler = (e, place, item) => {
        e.target.style.boxShadow = '0 4px 3px gray';
        e.target.style.opacity = '.33';
        setCurrentPlace(place);
        setCurrentItem(item);
    }
    const onDragEndHandler = (e) => {
        e.target.style.boxShadow = 'none';
        e.target.style.opacity = '1';
    }
    const onDropHandler = (e, place, item) => {
        e.preventDefault();
        e.target.style.boxShadow = 'none';
        e.target.style.opacity = '1';

        const currentIndex = currentPlace.items.indexOf(currentItem);
        currentPlace.items.splice(currentIndex, 1);

        const dropIndex = place.items.indexOf(item);
        place.items.splice(dropIndex + 1, 0, currentItem);

        setCurrentPlace(places.map(p => {
            if (p.placeID === place.placeID) {
                return place;
            }

            if (p.placeID === currentPlace.placeID) {
                return currentPlace;
            }

            return p;
        }))
    }


    return (
        <div id={'mainBlock'}>
            {places.map(place =>
                <div className={'placeItem'}>
                    <div>
                        <strong>
                            placeID: {place.placeID}&nbsp;&nbsp;
                            Title: {place.title}&nbsp;&nbsp;
                            Count items in: {place.items.length}
                        </strong>

                    </div>

                    {place.items.length !== 0 &&
                        <div className={'placeBody'}>
                            {place.items.length !== 0 && (
                                <div className={'itemsElement'}
                                     draggable={true}
                                     onDragOver={(e) => onDragOverHandler(e)}
                                     onDragLeave={(e) => onDragLeaveHandler(e)}
                                     onDragStart={(e) => onDragStartHandler(e, place, place.items.at(-1))}
                                     onDragEnd={(e) => onDragEndHandler(e)}
                                     onDrop={(e) => onDropHandler(e, place, place.items.at(-1))}
                                >
                                    {place.items.at(-1).itemID}
                                </div>
                            )}
                        </div>
                    }
                </div>
            )}
        </div>
    )
}


export default MainDND;



