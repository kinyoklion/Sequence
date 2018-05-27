/**
 * This file contains the implementation of the arrow element.
 *
 * @file This file defines the ArrowElement class.
 * @author Ryan Lamb
 * @since 5/26/2018
 */

import Arrow from '../draw/arrow';
import Element from 'element';
import ActorElement from "./actorElement";
import ArrowStyle from "../styles/arrowStyle";
import SequenceElement from "./sequenceElement";

/**
 * Class representing the arrow element of a sequence diagram.
 */
export default class ArrowElement extends Arrow implements Element {

    /**
     * Construct an instance of the ArrowElement class.
     * @param {SequenceElement} sequence The sequence this arrow is attached to. This controls positioning and order.
     * @param {ActorElement} startActor The starting actor for the arrow.
     * @param {ActorElement} endActor The ending actor for the arrow.
     * @param {ArrowStyle} style The style of the arrow.
     * @param draw The draw class used to render the arrow.
     * @param {string} label An optional label which will be attached to the arrow.
     */
    constructor(sequence: SequenceElement,
                startActor: ActorElement,
                endActor: ActorElement,
                style: ArrowStyle,
                draw: any,
                label?: string) {
        const y = sequence.getYPosition();
        super(startActor.centerX, y, endActor.centerX, y, style, draw, label);
        sequence.addElement(this);
    }

    /**
     * {@inheritDoc}
     */
    reflow() {
        //TODO: Move or re-create the arrow.
    }

    //constructor(startActor: )
}