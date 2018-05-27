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
    private readonly line: any;
    private readonly text: any;
    private group: any;

    /**
     * Construct an Arrow instance.
     * @param {number} startX The starting x position of the arrow.
     * @param {number} startY The starting y position of the arrow.
     * @param {number} endX The ending x position of the arrow.
     * @param {number} endY The ending y position of the arrow.
     * @param {ArrowStyle} style The style to use for the arrow.
     * @param draw SVG draw instance to use for rendering.
     * @param {string} label An optional label to show on the arrow.
     */
    constructor(startX: number,
                startY: number,
                endX: number,
                endY: number,
                style: ArrowStyle,
                private draw: any,
                label?: string) {
        this.group = draw.group();
        let mod = startX < endX ? 6 : -6;
        // noinspection TypeScriptValidateJSTypes
        this.line = draw.line(startX, startY, endX - mod, endY).stroke({
            width: style.width
        });
        if (style.dash) {
            // noinspection TypeScriptValidateJSTypes
            this.line.stroke({dasharray: style.dash.dashLength.toString() + ',' + style.dash.dashSpace});
        }
        // noinspection TypeScriptValidateJSTypes
        this.line.marker('end', 5, 5, function (add) {
            // noinspection TypeScriptValidateJSTypes
            add.polygon('0,0 0,5 5,2.5');
        });

        this.group.add(this.line);

        if(label) {
            this.text = draw.text(label).attr({x:this.line.bbox().cx, y:this.line.bbox().cy - 10});
            // noinspection TypeScriptValidateJSTypes
            this.text.font({anchor: "middle", leading:'0.5em', size:"12"});
            let textBBox = this.text.bbox();
            let rect = draw.rect(textBBox.width, textBBox.height)
                .move(textBBox.x, textBBox.y).fill(style.backgroundColor);
            this.group.add(rect);
            this.group.add(this.text);
        }
    }
}