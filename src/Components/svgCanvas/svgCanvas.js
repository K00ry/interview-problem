import React, {Component} from 'react';
import Mine from "./Mine";
import Line from "./line";



class SvgCanvas extends Component {

    state = {
        objects:[
            {
                index:0,
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
                }
            ]
        ,
        objectMoved: false
    };

    AddNewObject = () =>{
        this.setState({
            objects: [...this.state.objects, {
                index:0,
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
    getTheCenter = (lineParams,indexToChange)=>{
        this.setState({
            objects : this.state.objects.map((object,index)=> {
                if (index === indexToChange) {
                    return {
                        index:indexToChange,
                    }
                }
                return object
            }),
            lines:this.state.lines.map((object,index)=> {
                    if (index === indexToChange) {
                        return {
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




    render() {

        return (
            <>
                <button onClick={this.AddNewObject}>Add Item</button>
                <svg viewBox="0 0 100 100" >

                    {this.state.objects.map((item,index)=>
                        <Mine key={index}
                              getTheCenter={center=> this.getTheCenter(center,index)}
                              getChangedObjectPosition={start=>this.getChangedObjectPosition(start,index)}
                              AddNewLine={startPosition=>this.AddNewLine(startPosition)}
                              index={index}
                           />)
                    }
                    {
                        this.state.lines.map((item,index)=>
                            <Line
                                key={index}
                                index={index}
                                startPoint={item.start}
                                position={item.position}
                                removeLine={()=>this.removeLine(index)}/>)

                    }
                </svg>
            </>
        );
    }


}


export default SvgCanvas;
