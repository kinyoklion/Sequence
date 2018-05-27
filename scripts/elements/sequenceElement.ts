/**
 * This file contains the implementation of the sequence element.
 *
 * @file This file defines the SequenceElement class.
 * @author Ryan Lamb
 * @since 5/26/2018
 */

import Element from 'element';

/**
 * The sequence element maintains a list of all elements which are at the same position within the sequence diagram.
 * It also allows for the elements to be re-flowed in the case that dependent positions change.
 */
export default class SequenceElement implements Element {
    private readonly elements: Element[] = [];

    /**
     * Construct an instance of the SequenceElement class.
     * @param {number} y The y position of this sequence element.
     */
    constructor(private y: number) {

    }

    /**
     * {@inheritDoc}
     */
    reflow() {
        for(var element of this.elements) {
            element.reflow();
        }
    }

    /**
     * Add an element to the sequence element.
     * @param {Element} element The element to add.
     */
    addElement(element: Element) {
        this.elements.push(element);
    }

    /**
     * Get the y position of this sequence element.
     * @returns {number} The y position of the sequence element.
     */
    getYPosition() {
        return this.y;
    }

    /**
     * Move this sequence element to a new y position.
     * @param {number} y The new y position for the element. A reflow of dependent elements will be done.
     */
    move(y: number) {
        this.y = y;
        this.reflow();
    }
}