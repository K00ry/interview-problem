import React, {Component} from 'react';


class Mine extends Component {
    state = {
        rect: {x: 5, y: 2},
        circ:{x1: 35, y1: 22},
        objectMoved: false

    };
    startDrag(event, draggedElem,index) {
        event.preventDefault();
        let point = this.svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform(this.svg.getScreenCTM().inverse());
        this.setState({
            dragOffset: {
                x: point.x - this.state.rect.x,
                y: point.y - this.state.rect.y,
                x1: point.x - this.state.circ.x1,
                y1: point.y - this.state.circ.y1
            }
        });

        const mousemove = (event) => {
            event.preventDefault();
            point.x = event.clientX;
            point.y = event.clientY;
            let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
            this.setState({
                rect: {
                    x: cursor.x - this.state.dragOffset.x,
                    y: cursor.y - this.state.dragOffset.y,
                },
                circ:{
                    x1: cursor.x - this.state.dragOffset.x1,
                    y1: cursor.y - this.state.dragOffset.y1
                },
            });
            if(this.state.objectMoved){
                this.props.getChangedObjectPosition(this.state.circ,this.props.index);
            }
        };


        const mouseup = (event) => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }

    drawLine(event, draggedElem,index){
        event.preventDefault();
        this.setState({
            objectMoved: true
        })
        const mousemove = (event) => {
            event.preventDefault();
            let cursorPoint = this.svg.createSVGPoint();
            cursorPoint.x = event.clientX;
            cursorPoint.y = event.clientY;
            cursorPoint = cursorPoint.matrixTransform(this.svg.getScreenCTM().inverse());
            let start = this.state.circ;
            let LineParams = {
                start,
                cursorPoint
            };
            this.props.getTheCenter(LineParams, this.props.index);
        }

        const mouseup = (event) => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };

        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);


    }



    render() {

        return (
            <svg viewBox="0 0 100 100" ref={(svg) => this.svg = svg}>

                    <rect
                        rx="2"
                        width="30"
                        height="20"
                        x={this.state.rect.x}
                        y={this.state.rect.y}
                        onMouseDown={(e,index) => this.startDrag(e, this.svgRectElem,index)}

                    />

                    <circle r="1.5" pathLength="10" fill="red"
                        cx={this.state.circ.x1}
                        cy={this.state.circ.y1}
                        ref={(circle) => this.circleMid = circle}
                        onMouseDown={(e,index) => this.drawLine(e, this.circleMid,index)}
                    />
            </svg>


        );
    }



}


export default Mine;
