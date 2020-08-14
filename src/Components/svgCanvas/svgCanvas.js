import React, {Component} from 'react';
import Mine from "./Mine";
import Line from "./line";



class SvgCanvas extends Component {

    state = {
        objects:[
            {
                mouseIn: false,
                objectPosition:{
                    x1: 35,
                    y1: 22
                }
            },
        ],
        lines:[
                {
                    start:{
                        x: 35,
                        y: 22
                    },
                    position:{
                        x:0,
                        y:0
                    },
                    hideClass: true
                }
            ],
        objectMoved: false
    };



    AddNewObject = () =>{
        this.setState({
            objects: [...this.state.objects, {

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

    setCirclePositionInState = (start,indexToChange) =>{
        this.setState({
            objects : this.state.objects.map((object,index)=> {
                if (index === indexToChange) {
                    return {
                        ...object,
                        objectPosition:{
                            x:start.x1,
                            y:start.y1
                        }
                    }
                }
                return object
            }),
        })

    }

    updateLinePosition = (lineParams,indexToChange)=>{
        this.setState({
            objects : this.state.objects.map((object,index)=> {
                if (index === indexToChange) {
                    return {
                        ...object,
                        LineEndPoint:{
                            x:lineParams.cursorPoint.x,
                            y:lineParams.cursorPoint.y
                        }

                    }
                }
                return object
            }),
            lines:this.state.lines.map((object,index)=> {
                    if (index === indexToChange) {
                        return {
                            ...object,
                            start:{
                                x:lineParams.start.x,
                                y:lineParams.start.y
                            },
                            position:{
                                x:lineParams.cursorPoint.x,
                                y:lineParams.cursorPoint.y
                            }
                        }
                    }
                return object
            })
        })
    }

    getChangedObjectPosition = (start,indexToChange) =>{

        this.setState(  {
           lines: this.state.lines.map((object,index)=> {
                if (index === indexToChange) {

                    return {
                        ...object,
                        start:{
                            x:start.x1,
                            y:start.y1
                        }
                    }
                }
                return object
            })
        })
    };

    removeLine = (index)=>{

        this.setState({

            lines: this.state.lines.map((object,i)=>{
                if(index===i){
                    return{
                        start:{
                            x1: 0,
                            y1: 0
                        },
                        position: this.state.lines[index].start
                    }
                }
                return object
            })
        })
    }

    hideLine = (index)=>{
        this.setState({

            lines: this.state.lines.map((object,i)=>{
                if(index===i){
                    return{
                        ...object,
                        hideClass: true
                    }
                }
                return object
            })
        })
    }

    showLine = (index)=>{
        this.setState({

            lines: this.state.lines.map((object,i)=>{
                if(index===i){
                    return{
                        ...object,
                        // hideClass: !this.state.lines[index].hideClass
                        hideClass: false
                    }
                }
                return object
            })
        })
    }

    hoverState=(index)=>{
        this.setState({
            objects: this.state.objects.map((object,i)=>{
                if(index===i){
                    return{
                        ...object,
                        mouseIn: !this.state.objects[i].mouseIn,
                    }
                }
                return object
            })
        })
    }




    drawLine(event, draggedElem,index){
        event.preventDefault();

        this.showLine(index);
        this.setState({
            objectMoved: true
        })

        const mousemove = (event) => {
            event.preventDefault();
            let cursorPoint = draggedElem.createSVGPoint();
            cursorPoint.x = event.clientX;
            cursorPoint.y = event.clientY;
            cursorPoint = cursorPoint.matrixTransform(draggedElem.getScreenCTM().inverse());
            let start = this.state.objects[index].objectPosition;

            let lineParams = {
                start,
                cursorPoint
            };
            this.updateLinePosition(lineParams, index);
        }

        const mouseup = (event) => {

           let enteredIndex = this.state.objects.findIndex((obj) =>obj.mouseIn );
           console.log(enteredIndex);

            if(enteredIndex !== -1){



            }
            let LineParams = {
                cursorPoint: {x: 35, y: 22},
                start:{x: 35, y: 22}
            };
            this.updateLinePosition(LineParams, index);
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };

        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);


    }





    render() {

        return (
            <>
                <button onClick={this.AddNewObject}>Add Item</button>
                <svg viewBox="0 0 100 100" >

                    {this.state.objects.map((item,index)=>
                        <Mine key={index}
                              setCirclePositionInState={center=>this.setCirclePositionInState(center,index)}
                              // updateLinePosition={center=> this.updateLinePosition(center,index)}
                              getChangedObjectPosition={start=>this.getChangedObjectPosition(start,index)}
                              AddNewLine={startPosition=>this.AddNewLine(startPosition)}
                              index={index}
                              // showLine={()=>this.showLine(index)}
                              hoverState={()=>this.hoverState(index)}
                              // mouseIn={this.state.objects[index].mouseIn}
                              drawLine={(e,draggedElem)=>this.drawLine(e,draggedElem,index)}
                              objectMoved={this.state.objectMoved}
                           />)
                    }
                    {
                        this.state.lines.map((item,index)=>
                            <Line
                                key={index}
                                index={index}
                                start={item.start}
                                position={item.position}
                                // removeLine={()=>this.removeLine(index)}
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
