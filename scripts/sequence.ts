/**
 * Implementation of sequence diagrams.
 *
 * @file This file defines the Sequence class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */

import Actor from './actor'
import ActorStyle from './actorStyle';
import StringMap from './stringMap';
import Arrow from './arrow';
import ArrowStyle from './arrowStyle';
import DashStyle from './dashStyle';

declare var SVG: any;

/**
 * Class for creating and manipulating sequence diagrams.
 */
export class Sequence {
    private lockSequence: boolean = false;
    private readonly draw: any;
    private readonly actors: StringMap<Actor> = {};
    //TODO: Should index by sequence.
    private readonly arrows: Arrow[] = [];
    private sequenceNumber = 0;
    private actorStyle: ActorStyle = new ActorStyle('#3e84ff',
        100,
        75,
        20);

    private readonly arrowLineWidth = 2;
    private readonly arrowContinuousStyle = new ArrowStyle(this.arrowLineWidth,
        '#FFFFFF');
    private readonly arrowDashedStyle = new ArrowStyle(this.arrowLineWidth,
        '#FFFFFF',
        new DashStyle(5, 5));

    /**
     * Construct a new sequence diagram.
     * @param {string} element The div id to render the sequence diagram.
     * @param {number} width The width of the diagram.
     * @param {number} height The length of the diagram.
     */
    constructor(element: string, width: number, height: number) {
        this.draw = SVG(element).size(width, height);
    }

    /**
     * Create a new actor.
     * @param {string} name The name of the actor.
     */
    addActor(name: string) {
        const actor = new Actor(name, this.actorStyle, this.draw);
        const offset = Object.keys(this.actors).length * 200 + 10;
        actor.move(offset, 20);
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
        const startX = startActor.centerX;
        const endX = endActor.centerX;

        const y = (this.sequenceNumber * 50) + 150;
        let arrowStyle = dashed ? this.arrowDashedStyle : this.arrowContinuousStyle;
        const arrow = new Arrow(startX, y, endX, y, arrowStyle, this.draw, label);
        this.arrows.push(arrow);
        if (!this.lockSequence) {
            this.sequenceNumber++;
        }
    }

    /**
     * Lock the current sequence number. Added arrows will be in the same sequence position.
     */
    lockSequenceNumber() {
        this.lockSequence = true;
    }

    /**
     * Unlock the current sequence number and increment the sequence.
     * The sequence number will resume incrementing with additions.
     */
    unlockSequenceNumber() {
        if (this.lockSequence) {
            this.lockSequence = false;
            this.sequenceNumber++;
        }
    }
}