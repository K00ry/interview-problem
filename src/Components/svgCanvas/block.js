import React, {Component} from 'react';
import {getSvgCenter} from "../../jsUtil/index";


class Block extends Component {

    state = {
        rect: {x: 5, y: 2},
        circ:{x: 35, y: 22},
    };

    startDrag(event, draggedElem,index) {

        event.preventDefault();
        let {rect,circ} = this.state;
        let point = getSvgCenter(event,draggedElem);

        this.setState({
            dragOffset: {
                rect: {
                    x: point.x - rect.x,
                    y: point.y - rect.y,
                },
                circ: {
                    x: point.x - circ.x,
                    y: point.y - circ.y
                }
            }
        });

        const mousemove = (event) => {
            let {circ,dragOffset} = this.state;
            let {hooked,hookedSpot,setCirclePositionInState,index} = this.props
            let cursor = getSvgCenter(event,draggedElem);
            this.setState({
                rect: {
                    x: cursor.x - dragOffset.rect.x,
                    y: cursor.y - dragOffset.rect.y,
                },
                circ:{
                    x: cursor.x - dragOffset.circ.x,
                    y: cursor.y - dragOffset.circ.y
                },
            });

            setCirclePositionInState(circ,index);

            if(hooked){
                hookedSpot(circ,index)
            }
        };

        const mouseup = (event) => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }



    render() {

        let {rect,circ} = this.state;
        let {hoverState,drawLine} = this.props;
        return (
            <svg viewBox="0 0 100 100" ref={(svg) => this.svg = svg}>

                    <rect
                        rx="2"
                        width="30"
                        height="20"
                        x={rect.x}
                        y={rect.y}
                        onMouseDown={(e,index) => this.startDrag(e, this.svg,index)}
                        onMouseEnter={ hoverState}
                        onMouseLeave={ hoverState}
                    />

                    <circle r="1.5" pathLength="10" fill="red"
                        cx={circ.x}
                        cy={circ.y}
                        onMouseDown={(e,index) => drawLine(e, this.svg,index)}
                    />
            </svg>
        );
    }
}


export default Block;
