import React, {Component} from 'react';
import {getSvgCenter} from "../../jsUtil/";
import {XY} from "./svgCanvas";


interface IBlockProps {
    setCirclePositionInState: (start:XY,indexTochange:number)=>void,
    hookedSpot: (hookSpot:XY,index:number)=>void,
    hoverState:(index:number)=>void,
    drawLine:(event:React.MouseEvent<SVGCircleElement,MouseEvent>, draggedElem:SVGSVGElement,index:number)=>void,
    hooked:boolean,
    index:number
}

interface IBlockState {
    rect:XY,
    circ:XY,
    dragOffset:IDragOffset
}

interface IDragOffset {
    rect:XY,
    circ:XY,
}


class Block extends Component <IBlockProps,IBlockState>{


    state:IBlockState = {
        rect: {x: 5, y: 2},
        circ:{x: 35, y: 22},
        dragOffset:{
            rect:{x: 5, y: 2},
            circ:{x: 35, y: 22}
        }
    };

    svg: SVGSVGElement | undefined;

    startDrag(event:React.MouseEvent<SVGRectElement,MouseEvent>, draggedElem:SVGSVGElement) {

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
            let { circ,dragOffset } = this.state;
            let { hooked,hookedSpot,setCirclePositionInState,index } = this.props
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

        const { rect, circ } = this.state;
        const { hoverState, drawLine, index } = this.props;

        return (
            <svg viewBox="0 0 100 100"
                 ref={(svg:SVGSVGElement) => this.svg = svg}
                 onMouseEnter={()=> hoverState(index)}
                 onMouseLeave={()=> hoverState(index)}>

                <rect
                    rx="2"
                    width="30"
                    height="20"
                    x={rect.x}
                    y={rect.y}
                    onMouseDown={(e:React.MouseEvent<SVGRectElement,MouseEvent>) => (this.svg && this.startDrag(e, this.svg))}

                />


                <circle r="1.5" pathLength="10" fill="red"
                    cx={circ.x}
                    cy={circ.y}
                    onMouseDown={(e:React.MouseEvent<SVGCircleElement,MouseEvent>) => (this.svg && drawLine(e, this.svg,index))}
                />
            </svg>
        );
    }
}


export default Block;
