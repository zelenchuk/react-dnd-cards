import './index.css'
import React, {useState} from "react";


// const initialState = [
//     {placeID: 1, title: "Firstly", items: [{itemID: 1}]},
//     {placeID: 2, title: "Second", items: [{itemID: 2}]},
//     {placeID: 3, title: "Third", items: [{itemID: 3}]},
//     {placeID: 4, title: "Fourth", items: [{itemID: 4}]},
//     {placeID: 5, title: "Fifth", items: [{itemID: 5}]},
//     {placeID: 6, title: "Sixth", items: [{itemID: 6}]},
// ];

const initialState = [
    {placeID: 1, title: "Firstly", items: [{itemID: 1}]},
    {placeID: 2, title: "Second", items: []},
    {placeID: 3, title: "Third", items: []},
    {placeID: 4, title: "Fourth", items: []},
    {placeID: 5, title: "Fifth", items: []},
    {placeID: 6, title: "Sixth", items: []},
];

const MainDND = () => {
    const [places, setPlaces] = useState(initialState);
    const [currentPlace, setCurrentPlace] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);


    const onDragOverHandler = (e) => {
        e.preventDefault();
        if (e.target.className === 'itemsElement') {
            e.target.style.boxShadow = '0 4px 3px gray';
            // e.target.style.opacity = '.33';
        }
    }
    const onDragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none';
        // e.target.style.opacity = '1';
    }
    const onDragStartHandler = (e, place, item) => {
        e.target.style.boxShadow = '0 4px 3px gray';
        // e.target.style.opacity = '.33';

        setCurrentPlace(place);
        setCurrentItem(item);
    }
    const onDragEndHandler = (e) => {
        console.log(e.target);
        e.target.style.boxShadow = 'none';
        // e.target.style.opacity = '.33';

    }
    const onDropHandler = (e, place, item) => {
        e.preventDefault();
        e.target.style.boxShadow = 'none';
        // e.target.style.opacity = '.33';
        e.target.parentElement.parentElement.style.background = 'red';

        const currentIndex = currentPlace.items.indexOf(currentItem);
        currentPlace.items.splice(currentIndex, 1);

        const dropIndex = place.items.indexOf(item);
        place.items.splice(dropIndex + 1, 0, currentItem);

        console.log(place)

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
                <div key={place.placeID} className={'placeItem'}>
                    <div>
                        <div>
                            <strong>placeID: {place.placeID}&nbsp;&nbsp;Title: {place.title}</strong>
                        </div>
                        <div>Count items in: {place.items.length}</div>


                    </div>
                    <div className={'placeBody'}
                         onDragOver={(e) => {
                             e.preventDefault();
                             e.target.classList.add('onDragOver')
                         }}
                         onDragLeave={(e) => {
                             e.preventDefault();
                             e.target.classList.remove('onDragOver')
                         }}
                         onDragEnd={(e) => {
                             e.preventDefault();
                             e.target.classList.add('onDrop');
                         }}
                    >
                        {place.items.length !== 0 &&
                            <>
                                {place.items.length !== 0 && (
                                    <div className={'itemsElement'}
                                         draggable={true}
                                         onDragOver={(e) => onDragOverHandler(e)}
                                         onDragLeave={(e) => onDragLeaveHandler(e)}
                                         onDragStart={(e) => onDragStartHandler(e, place, place.items.at(-1))}
                                         onDragEnd={(e) => onDragEndHandler(e)}
                                         onDrop={(e) => onDropHandler(e, place, place.items.at(-1))}
                                         onMouseMove={(e) => {
                                             e.preventDefault();
                                              // e.target.parentElement.parentElement.style.background = 'purple';
                                         }}
                                    >
                                        {place.items.at(-1).itemID}
                                    </div>
                                )}
                            </>}
                    </div>
                </div>
            )}
        </div>
    )
}


export default MainDND;