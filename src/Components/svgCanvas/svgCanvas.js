import React, {Component} from 'react';
import Mine from "./Mine";
import Line from "./line";



class SvgCanvas extends Component {

    state = {
        objects:[
            {
                mouseIn: false
            },
        ],
        lines:[
                {
                    start:{
                        x1: 35,
                        y1: 22
                    },
                    position:{
                        x:0,
                        y:0
                    }
                    ,
                    hideClass: false
                }
            ]
        ,
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
                        x1: 35,
                        y1: 22
                    },
                    position:{
                        x:0,
                        y:0
                    }
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
                        // index:indexToChange,
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
                                x:lineParams.start.x1,
                                y:lineParams.start.y1
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
                        position:{
                            x:0,
                            y:0
                        }
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
                        hideClass: !this.state.lines[index].hideClass
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
                        hideClass: !this.state.lines[index].hideClass
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
                        mouseInIndex: i
                    }
                }
                return object
            })
        })
    }

    stickPosition=(index)=>{



    }
    hoverComponent=()=>{
     console.log( this.state.objects.map((obj,i)=>{
         if(obj.mouseIn === true ){
             return obj
         }
      }))




    }





    render() {

        return (
            <>
                <button onClick={this.AddNewObject}>Add Item</button>
                <svg viewBox="0 0 100 100" >

                    {this.state.objects.map((item,index)=>
                        <Mine key={index}
                              setCirclePositionInState={center=>this.setCirclePositionInState(center,index)}
                              updateLinePosition={center=> this.updateLinePosition(center,index)}
                              getChangedObjectPosition={start=>this.getChangedObjectPosition(start,index)}
                              AddNewLine={startPosition=>this.AddNewLine(startPosition)}
                              index={index}
                              showLine={()=>this.showLine(index)}
                              hoverState={()=>this.hoverState(index)}
                              hoverComponent={this.hoverComponent}
                              mouseIn={this.state.objects[index].mouseIn}

                              // stickPosition={()=>this.stickPosition(index)}
                           />)
                    }
                    {
                        this.state.lines.map((item,index)=>
                            <Line
                                key={index}
                                index={index}
                                start={item.start}
                                position={item.position}
                                removeLine={()=>this.removeLine(index)}
                                hideClass={item.hideClass}
                                hideLine={()=>this.hideLine(index)}/>)
                    }
                </svg>
            </>
        );
    }


}


export default SvgCanvas;
