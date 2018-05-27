/**
 * This file contains the implementation of the note element.
 *
 * @file This file defines the NoteElement class.
 * @author Ryan Lamb
 * @since 5/26/2018
 */

import Note from '../draw/note';
import Element from 'element';
import SequenceElement from "./sequenceElement";
import NoteStyle from "../styles/noteStyle";
import ActorElement from "./actorElement";

/**
 * This class represents a note element on a UML sequence diagram.
 */
export default class NoteElement extends Note implements Element {

    /**
     * Construct an instance of the NoteElement class.
     * @param {SequenceElement} sequence The sequence associated with this note. This controls position and ordering.
     * @param {ActorElement} anchorActor The actor that this note is anchored to.
     * @param {string} note The text associated with the note.
     * @param {NoteStyle} style The style of the note.
     * @param draw The draw class used to render the note.
     */
    constructor(private sequence: SequenceElement,
                private anchorActor: ActorElement,
                note: string,
                style: NoteStyle,
                draw: any) {
        super(note, style, draw);
        this.move(anchorActor.centerX, sequence.getYPosition());
    }

    /**
     * {@inheritDoc}
     */
    reflow() {
        this.move(this.anchorActor.centerX, this.sequence.getYPosition());
    }

}