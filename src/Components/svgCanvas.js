// import React, {Component} from 'react';


class Rect extends Component {

   state = {rect: {x: 5, y: 2}};


    render() {
        return (
            <svg viewBox="0 0 100 100" ref={(svg) => this.svg = svg}>
                <rect
                    x={this.state.rect.x}
                    y={this.state.rect.y}
                    width="20"
                    height="20"
                    ref={(e) => this.svgRectElem = e}
                    onMouseDown={(e) => this.startDrag(e, this.svgRectElem)}
                />
            </svg>
        );
    }

    startDrag(event, draggedElem) {
        event.preventDefault();
        let point = this.svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform(this.svg.getScreenCTM().inverse());
        this.setState({dragOffset: {
                x: point.x - this.state.rect.x,
                y: point.y - this.state.rect.y
            }});

        const mousemove = (event) => {
            event.preventDefault();
            point.x = event.clientX;
            point.y = event.clientY;
            let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
            this.setState({rect: {
                    x: cursor.x - this.state.dragOffset.x,
                    y: cursor.y - this.state.dragOffset.y
                }});
        };

        const mouseup = (event) => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };

        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }
}


export default Rect;
