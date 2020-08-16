// utility function for maping State objects or lines and return th updated state
export  const StateMap = (itemTochange,indexToChange,propertyTochange,inputVal) => {

    let updatedState={}
    itemTochange.map((object,i)=> {
        if (i === indexToChange) {
            updatedState = {
                ...object
            }
            Object.defineProperty(updatedState, propertyTochange, {
                // value:inputVal,
                // writable: true,
                // enumerable: true,
                // configurable: true
            });


            return updatedState
        }
        return object
    })
    return itemTochange

}


// utility function fo getting the (x,y) position  of the passed SVG element
export const getSvgCenter = (event,draggedElem)=>{

    let point = draggedElem.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(draggedElem.getScreenCTM().inverse());

    return point
}
