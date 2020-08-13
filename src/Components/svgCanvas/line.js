import React, {Component} from 'react';

class Line extends Component {
    render() {

        let {startPoint,position} = this.props
        return (
            <path className='child__line'

                d={`M ${startPoint.x} ${startPoint.y} 
                        C ${startPoint.x+20 } ${startPoint.y+20 }, 
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