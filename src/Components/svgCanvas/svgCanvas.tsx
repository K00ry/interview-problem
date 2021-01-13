import React, {Component} from 'react';




class SvgCanvas extends Component {


    state={
        div: 0,
        svg: 0,

    }
    transformDiv=(e:any)=>{
        this.setState({div: e.target.value})
    }
    transformSVG=(e:any)=>{
        this.setState({svg: e.target.value})
    }

    render() {

        return (
            <>
                <div>transform div </div>
                <input type="range"  min={0} max={100} onChange={this.transformDiv} value={this.state.div}/>
                <div style={{transform: `translateX(${this.state.div}px)`}}>
                    <svg viewBox="0 0 100 100">
                        <rect  width="10" height="10" fill="#C4C4C4"/>
                    </svg>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>

                <div>transform SVG</div>
                <input type="range"  min={0} max={100} onChange={this.transformSVG} value={this.state.svg}/>
                <svg viewBox="0 0 10 10" >
                    <rect style={{transform: `translateX(${this.state.svg}px)`}} width="2" height="2"  fill="#C4C4C4"/>
                </svg>
            </>
        );
    }
}


export default SvgCanvas;
