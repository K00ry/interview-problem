import React, {Component} from 'react';
import Mine from "./Mine";


class SvgCanvas extends Component {





    render() {

        return (
            <>
                <button>Add Item</button>
                <svg viewBox="0 0 100 100" >

                    <Mine  />
                    <Mine  />


                </svg>
            </>
        );
    }


}


export default SvgCanvas;
