/**
 * Implementation of an arrow for sequence diagrams.
 *
 * @file This file implements the Arrow class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */
import ArrowStyle from '../styles/arrowStyle';

/**
 * Class which represents an arrow on a sequence diagram.
 */
export default class Arrow {
    private line: any;
    private text: any;
    protected group: any;

    /**
     * Construct an Arrow instance.
     * @param {ArrowStyle} style The style to use for the arrow.
     * @param draw SVG draw instance to use for rendering.
     * @param {string} label An optional label to show on the arrow.
     */
    constructor(protected style: ArrowStyle,
                protected draw: any,
                protected label?: string) {
        this.group = this.draw.group();
    }

    /**
     * Draw a line with the style of the arrow.
     * @param {number} startX The starting x position of the arrow.
     * @param {number} startY The starting y position of the arrow.
     * @param {number} endX The ending x position of the arrow.
     * @param {number} endY The ending y position of the arrow.
     */
    drawLine(startX: number,
             startY: number,
             endX: number,
             endY: number) {

        if(this.line) {
            this.line.remove();
        }
        if(this.text) {
            this.text.remove();
        }

        let mod = startX < endX ? 6 : -6;
        // noinspection TypeScriptValidateJSTypes
        this.line = this.draw.line(startX, startY, endX - mod, endY).stroke({
            width: this.style.width
        });
        if (this.style.dash) {
            // noinspection TypeScriptValidateJSTypes
            this.line.stroke({dasharray: this.style.dash.dashLength.toString() + ',' + this.style.dash.dashSpace});
        }
        // noinspection TypeScriptValidateJSTypes
        this.line.marker('end', 5, 5, function (add) {
            // noinspection TypeScriptValidateJSTypes
            add.polygon('0,0 0,5 5,2.5');
        });

        this.group.add(this.line);

        if(this.label) {
            this.text = this.draw.text(this.label).attr({x:this.line.bbox().cx, y:this.line.bbox().cy - 10});
            // noinspection TypeScriptValidateJSTypes
            this.text.font({anchor: "middle", leading:'0.5em', size:"12"});
            let textBBox = this.text.bbox();
            let rect = this.draw.rect(textBBox.width, textBBox.height)
                .move(textBBox.x, textBBox.y).fill(this.style.backgroundColor);
            this.group.add(rect);
            this.group.add(this.text);
        }
    }
}