/**
 * Implementation of actors for sequence diagrams.
 *
 * @file This file implements the Actor class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */
import ActorStyle from "../styles/actorStyle";

/**
 * Class which represents an actor in a sequence diagram.
 */
export default class Actor {
    private readonly rect: any;
    private readonly text: any;
    private readonly group: any;
    private readonly line: any;

    /**
     * Get the center of the actor.
     * @returns {number} The center position of the rendered actor.
     */
    get centerX(): number {
        const bounds = this.line.rbox(this.draw);
        return bounds.cx;
    }

    /**
     * Construct an Actor instance.
     * @param {string} name The name of the actor.
     * @param {ActorStyle} style Style for the actor.
     * @param draw SVG draw instance for rendering the actor.
     */
    constructor(public name: string, public style: ActorStyle, private draw: any) {
        // noinspection TypeScriptValidateJSTypes
        this.rect = draw.rect(style.width, style.height).attr({fill: style.color}).stroke({width: 3});
        this.text = draw.text(name).attr({x: style.width / 2, y: style.height / 2});
        // noinspection TypeScriptValidateJSTypes
        this.text.font({anchor: 'middle', leading: '0.5em', size: style.fontSize});
        // noinspection TypeScriptValidateJSTypes
        this.line = draw.line(style.width / 2, style.height, style.width / 2, 500).stroke({
            width: 3,
            dasharray: '10,5'
        });
        this.group = draw.group();
        this.group.add(this.rect);
        this.group.add(this.text);
        this.group.add(this.line);
    }

    /**
     * Move the actor.
     * @param {number} x New x position for the actor.
     * @param {number} y New y position for the actor.
     */
    move(x: number, y: number) {
        this.group.move(x, y);
    }
}