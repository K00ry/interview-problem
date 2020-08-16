import React, {Component} from 'react';
import Block from "./block";
import Lines from "./lines";
import { StateMap } from "../../jsUtil";
import {getSvgCenter} from "../../jsUtil"

interface LineParams {
    start: object
    cursorPoint: object
}


class SvgCanvas extends Component {

    state = {
        blocks:[
            {
                mouseIn: false,
                hooked:false,
                blockPosition:{
                    x: 35,
                    y: 22
                }
            },
        ],
        lines:[
                {
                    hideClass: true,
                    hooked:false,
                    start:{
                        x: 35,
                        y: 22
                    },
                    position:{
                        x: 35,
                        y: 22
                    },
                    hookedToBlock: null
                }
            ]
    };

    setCirclePositionInState = (start:object,indexToChange:number) =>{
        // console.log(start);
        this.setState({
            // blocks: StateMap(this.state.blocks,indexToChange,'blockPosition',start),
            blocks : this.state.blocks.map((block,index)=> {
                if (index === indexToChange) {
                    return {
                        ...block,
                        blockPosition:start
                    }
                }
                return block
            }),
            lines: this.state.lines.map((block,index)=> {
                if (index === indexToChange) {

                    return {
                        ...block,
                        start: start
                    }
                }
                return block
            })
        })
        // console.log(StateMap(this.state.lines,indexToChange,'start',start));
        //
        // console.log(this.state.lines);
    }

    hookedSpot = (hookSpot:object,index:number) =>{

        this.setState({
            lines: this.state.lines.map((line)=>{
                if(line.hookedToBlock === index ){
                    return{
                        ...line,
                        position: hookSpot
                    }
                }
                return line
            })
        })
    }

    AddNewBlock = () =>{
        this.setState({
            blocks: [...this.state.blocks, {
                mouseIn: false
            }]
        })
        this.AddNewLine();

    }

    AddNewLine = () =>{
        this.setState({
            lines:[
                ...this.state.lines,
                {
                    start:{
                        x: 35,
                        y: 22
                    },
                    position:{
                        x: 35,
                        y: 22
                    },
                    hideClass: true
                }
            ],
        });
    }

    updateLinePosition = (lineParams:LineParams,indexToChange:number)=>{
        this.setState({
            lines:this.state.lines.map((block,index)=> {
                    if (index === indexToChange) {
                        return {
                            ...block,
                            start:lineParams.start
                            ,
                            position:lineParams.cursorPoint
                        }
                    }
                return block
            })
        })
    }




    hideLine = (index:number)=>{
        let indexOfHookedBlock = this.state.lines[index].hookedToBlock;
        this.setState({
            lines: this.state.lines.map((block,i)=>{
                if(index===i){
                    return{
                        ...block,
                        hideClass: true,
                        hooked:false,
                        hookedToBlock: null
                    }
                }
                return block
            }),
            blocks: this.state.blocks.map((block,i)=>{
                if(indexOfHookedBlock===i){
                    return{
                        ...block,
                        hookedToLine:null,
                        hooked:false
                    }
                }
                return block
            })

        })
    }

    showLine = (index:number)  =>{
        this.setState({

            lines: this.state.lines.map((block,i)=>{
                if(index===i){
                    return{
                        ...block,
                        hideClass: false,
                    }
                }
                return block
            })
        })
    }

    hoverState = (e:MouseEvent,index:number)=>{
        this.setState({
            blocks: this.state.blocks.map((block,i)=>{
                if(index===i){
                    return{
                        ...block,
                        mouseIn: !this.state.blocks[i].mouseIn,
                    }
                }
                return block
            })
        })
    }




    drawLine = (event:MouseEvent, draggedElem:SVGRect,index:number) =>{
        event.preventDefault();
        this.showLine(index);

        const mousemove = (event:MouseEvent) => {
            event.preventDefault();
            let cursorPoint = getSvgCenter(event,draggedElem);
            cursorPoint.x = cursorPoint.x - 2 ;
            cursorPoint.y = cursorPoint.y - 2 ;

            let start = this.state.blocks[index].blockPosition;

            let lineParams = {
                start,
                cursorPoint
            };
            this.updateLinePosition(lineParams, index);
        }

        const mouseup = (event:MouseEvent) => {
           let enteredIndex = this.state.blocks.findIndex((obj) =>obj.mouseIn );
            if(enteredIndex !== -1){
                this.setState({
                    lines: this.state.lines.map((line,i)=>{
                        if(index === i){
                            return{
                                ...line,
                                hooked:true,
                                hookedToBlock: enteredIndex
                            }
                        } return line
                    }),
                    blocks:this.state.blocks.map((obj,i)=>{
                        if(enteredIndex === i){
                            return{
                                ...obj,
                                hooked:true,
                                hookedToLine: enteredIndex
                            }
                        } return obj
                    })
                })

                let LineParams = {
                    cursorPoint: this.state.lines[enteredIndex].start,
                    start:this.state.lines[index].start
                };
                this.updateLinePosition(LineParams, index);

            }
            else{
                let resetPosition = this.state.lines[index].start;
                let LineParams = {
                    cursorPoint: resetPosition,
                    start:resetPosition,
                };
                this.hideLine(index)
                this.updateLinePosition(LineParams, index);
            }

            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };

        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }


    render() {

        return (
            <>
                <button onClick={this.AddNewBlock}>Add Item</button>
                <svg viewBox="0 0 100 100" >

                    {this.state.blocks.map((item,index)=>
                        <Block key={index}
                               setCirclePositionInState={(center:object)=>this.setCirclePositionInState(center,index)}
                               hookedSpot={(hookedSpot:object)=>this.hookedSpot(hookedSpot,index)}
                               drawLine={(e:MouseEvent,draggedElem:DOMRect)=>this.drawLine(e,draggedElem,index)}
                               index={index}
                               hoverState={()=>this.hoverState(index)}
                               hooked={item.hooked}
                           />)
                    }
                    {
                        this.state.lines.map((item,index)=>
                            <Lines
                                key={index}
                                index={index}
                                start={item.start}
                                position={item.position}
                                // hooked={item.hooked}
                                hideClass={item.hideClass}
                                hideLine={()=>this.hideLine(index)}
                            />)
                    }
                </svg>
            </>
        );
    }


}





export default SvgCanvas;
