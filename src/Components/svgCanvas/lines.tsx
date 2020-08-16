import React from 'react';

interface ILineProps {
    start:XY,
    position:XY,
    hideClass: boolean,
    hideLine: ()=> void,
    index:number

}
export interface XY {
    x:number,
    y:number
}

const Lines = (props :ILineProps ) => {

         let {start,position,hideClass,hideLine} = props;
         let  hideClassState = hideClass ? 'child__line': "";

    return (
        <path   onClick={hideLine}
                className={hideClassState}
                d={`M ${start.x} ${start.y} 
                        C ${start.x + 20 } ${start.y + 20 }, 
                        ${position.x} ${position.y}, 
                       ${position.x} ${position.y}`}
                fill="transparent"
                stroke="blue"
                strokeWidth="1"
            />
    );
};

export default Lines;