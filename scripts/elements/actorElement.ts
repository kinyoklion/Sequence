/**
 * Implementation of the actor element.
 * @file This file implements the ActorElement class.
 * @author Ryan Lamb
 * @since 5/25/2018
 */

import Actor from '../draw/actor';
import Element from 'element';
import ActorStyle from '../styles/actorStyle'
import SequenceElement from "./sequenceElement";
import NoteElement from "./noteElement";

/**
 * Class which represents an actor element in a sequence diagram.
 * Elements contain the relationships between the different elements of the sequence diagram.
 */
export default class ActorElement extends Actor implements Element {

    private readonly elements: NoteElement[] = [];
    private readonly attachedSequences: SequenceElement[] = [];

    /**
     * Construct an instance of the ActorElement
     * @param {string} name The name of the actor.
     * @param {ActorStyle} style The style for the actor.
     * @param draw The draw class to render the actor with.
     */
    constructor(private sequence: SequenceElement, name: string, style: ActorStyle, draw: any) {
        super(name, style, draw);
        //Need to get the position before adding the element. Otherwise it will be the position of this element.
        const rightX = sequence.getRightX();
        sequence.addElement(this);
        this.move(rightX + style.spacing, sequence.getYPosition());
    }

    /**
     * {@inheritDoc}
     */
    reflow() {
        var widest = 0;
        for(var element of this.elements) {
            if(element.getWidth() > widest) {
                widest = element.getWidth();
            }
        }
        //Need to get the position before adding the element. Otherwise it will be the position of this element.
        const rightX = this.sequence.getRightX();
        this.sequence.addElement(this);
        this.move(rightX + this.style.spacing + widest/2, this.sequence.getYPosition());
        
        let largestY = 0;
        for(var sequence of this.attachedSequences) {
            if(sequence.getYPosition() > largestY) {
                largestY = sequence.getYPosition();
            }
        }
        let length = largestY - this.sequence.getYPosition();
        this.updateLine(length);
        console.log("Actor line length: " + length)
    }

    /**
     * Add a note element to the actor.
     * @param {NoteElement} element The note to add to the actor.
     */
    addElement(element: NoteElement) {
        this.elements.push(element);
    }
    
    /**
     * Attach a sequence to this actor. The actors activity line must extend to cover the sequence.
     * @param {SequenceElement} sequence Attach a sequence to the actor. Used to manage the length of the actor line.
     */
    attach(sequence: SequenceElement) {
        this.attachedSequences.push(sequence);
    }

    /**
     * {@inheritDoc}
     */
    getRightX() : number {
        let furthest = 0;

        for(var index = 0; index < this.elements.length; index++)
        {
            var elementRight = this.centerX + (this.elements[index].getWidth() / 2);
            if(elementRight > furthest) {
                furthest = elementRight;
            }
        }
        // noinspection BadExpressionStatementJS
        const bbox = this.group.rbox(this.draw);
        if(bbox.x + bbox.width > furthest)
        {
            furthest = bbox.x + bbox.width;
        }
        return furthest;
    }
}