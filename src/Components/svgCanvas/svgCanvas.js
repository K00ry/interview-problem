import React, {Component} from 'react';
import Mine from "./Mine";


class SvgCanvas extends Component {

    state = {
        objects:[
            {
                x:0,
                y:0
            },
        ]
    };

    AddNewObject=()=>{
        this.setState({
            objects: [...this.state.objects, {x:0, y:0}]
        })
    }

    getTheCenter = (center,indexToChange)=>{

        this.setState({

            test:center
        }, (()=>console.log(this.state.test)))


        // this.setState({
        // objects : this.state.objects.map((object,index)=>{
        //     if(index === indexToChange){
        //         return{
        //             ...object,
        //             center
        //         }
        //     }
        //     return object
        // })
        //
        // })
    }




    render() {

        return (
            <>
                <button onClick={this.AddNewObject}>Add Item</button>
                <svg viewBox="0 0 100 100" >

                    {this.state.objects.map((item,index)=>
                        <Mine key={index}
                              centerPoint={center=> this.getTheCenter(center,index)}
                              index={index}
                              x={item.x}
                              y={item.y} />)}
                </svg>
            </>
        );
    }


}


export default SvgCanvas;
