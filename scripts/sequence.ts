/**
 * Implementation of sequence diagrams.
 *
 * @file This file defines the Sequence class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */

import ActorStyle from './styles/actorStyle';
import StringMap from './stringMap';
import ArrowStyle from './styles/arrowStyle';
import DashStyle from './styles/dashStyle';
import NoteStyle from './styles/noteStyle';
import SequenceElement from "./elements/sequenceElement";
import ArrowElement from "./elements/arrowElement";
import ActorElement from "./elements/actorElement";
import NoteElement from "./elements/noteElement";

declare var SVG: any;

/**
 * Class for creating and manipulating sequence diagrams.
 */
export class Sequence {
    private sequenceLocked: boolean = false;
    private readonly draw: any;
    private readonly actors: StringMap<ActorElement> = {};
    private actorStyle: ActorStyle = new ActorStyle('#3e84ff',
        100,
        75,
        20,
        100);

    private noteStyle: NoteStyle = new NoteStyle("#fff9e6", 10, 1, 12);
    private actorSequence: SequenceElement = new SequenceElement(20);

    private readonly arrowLineWidth = 2;
    private readonly arrowContinuousStyle = new ArrowStyle(this.arrowLineWidth,
        '#FFFFFF');
    private readonly arrowDashedStyle = new ArrowStyle(this.arrowLineWidth,
        '#FFFFFF',
        new DashStyle(5, 5));

    private readonly sequences: SequenceElement[] = [];

    private yLast: number = 100;
    private readonly yDelta: number = 50;

    /**
     * Construct a new sequence diagram.
     * @param {string} element The div id to render the sequence diagram.
     * @param {number} width The width of the diagram.
     * @param {number} height The length of the diagram.
     */
    constructor(element: string, width: number, height: number) {
        this.draw = SVG(element).size(width, height);
        this.draw.rect(width, height).attr({ fill: '#FFFFFF' })
    }

    /**
     * Create a new actor.
     * @param {string} name The name of the actor.
     */
    addActor(name: string) {
        const actor = new ActorElement(this.actorSequence, name, this.actorStyle, this.draw);
        //const offset = Object.keys(this.actors).length * 200 + 10;
        //actor.move(offset, 20);
        this.actors[name] = actor;
    }

    /**
     * Add a new arrow to the diagram.
     * @param {string} start Name of the actor to start the arrow on.
     * @param {string} end Name of the actor to end the arrow on.
     * @param {boolean} dashed True if the line should be dashed.
     * @param {string} label Label to place on the arrow.
     */
    addArrow(start: string, end: string, dashed: boolean, label?: string) {
        const startActor = this.actors[start];
        const endActor = this.actors[end];

        const y = this.yLast + this.yDelta;
        const sequence = new SequenceElement(y);
        this.sequences.push(sequence);
        let arrowStyle = dashed ? this.arrowDashedStyle : this.arrowContinuousStyle;
        new ArrowElement(sequence, startActor, endActor, arrowStyle, this.draw, label);

        if (!this.sequenceLocked) {
            this.yLast = y;
        }
    }

    /**
     * Add a new note to the diagram.
     * @param {string} anchor The actor to anchor the note to.
     * @param {string} text The text for the note.
     */
    addNote(anchor: string, text: string) {
        const anchorActor = this.actors[anchor];
        const y = this.yLast + this.yDelta;
        const sequence = new SequenceElement(y);
        const note = new NoteElement(sequence, anchorActor, text, this.noteStyle, this.draw);
        this.sequences.push(sequence);
        if(!this.sequenceLocked) {
            this.yLast = y + note.height;
        }
    }

    /**
     * Lock the current sequence position. Added arrows will be in the same sequence position.
     */
    lockSequence() {
        this.sequenceLocked = true;
    }

    /**
     * Unlock the current sequence and increment the sequence.
     * The sequence position will resume incrementing with additions.
     */
    unlockSequence() {
        if (this.sequenceLocked) {
            this.sequenceLocked = false;
        }
    }

    /**
     * Re-flow the sequence diagram. Adjusts for any modifications that would change spacing of elements.
     */
    reflow() {
        //the note can change the width of the actor.
        this.actorSequence.reflow();
        for(var item of this.sequences) {
            item.reflow();
        }
    }
}