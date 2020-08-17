// utility function fo getting the (x,y) position  of the passed SVG element

export const getSvgCenter = (event,draggedElem)=>{

    let point = draggedElem.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(draggedElem.getScreenCTM().inverse());

    return point
}
