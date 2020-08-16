import React, {Component} from 'react';
import {getSvgCenter} from "../../jsUtil/";
import {XY} from "./lines";


interface IProps {

    setCirclePositionInState: (start:XY,indexTochange:number)=>void,
    hookedSpot: (hookSpot:XY,index:number)=>void,
    hoverState:(e:MouseEvent,index:number)=>void,
    drawLine:(event:MouseEvent, draggedElem:any,index:number)=>void,
    hooked:boolean,
    index:number
}

interface IState {
    rect:XY,
    circ:XY,
    dragOffset:{
        rect:XY,
        circ:XY,
    }

}


class Block extends Component <IProps,IState>{



    state:IState = {
        rect: {x: 5, y: 2},
        circ:{x: 35, y: 22},
        dragOffset:{
            rect:{x: 5, y: 2},
            circ:{x: 35, y: 22}
        }
    };

    private svg: any;
    // private rectSvg: SVGRect | null = null;


    startDrag(event:MouseEvent, draggedElem:SVGRect,index:number) {

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

        const mousemove = (event:MouseEvent) => {
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

        const mouseup = (event:MouseEvent) => {
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
                        onMouseDown={(e:MouseEvent,index:number) => this.startDrag(e, this.svg,index)}
                        onMouseEnter={ ()=>hoverState}
                        onMouseLeave={ ()=>hoverState}
                    />

                    <circle r="1.5" pathLength="10" fill="red"
                        cx={circ.x}
                        cy={circ.y}
                        onMouseDown={(e:MouseEvent,index:number) => drawLine(e, this.svg,index)}
                    />
            </svg>
        );
    }
}


export default Block;
