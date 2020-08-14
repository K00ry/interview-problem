import React, {Component} from 'react';

class Line extends Component {


    render() {

        let {start,position,hideClass,hideLine} = this.props;
        let  hideClassState = hideClass ? 'child__line': "";

        return (
            <path onClick={hideLine}
                  className={hideClassState}

                d={`M ${start.x} ${start.y} 
                        C ${start.x + 20 } ${start.y + 20 }, 
                        ${position.x} ${position.y}, 
                        ${position.x} ${position.y }`}
                fill="transparent"
                stroke="blue"
                strokeWidth="1"
            />
        );
    }
}

export default Line;