/**
 * Implementation of the actor element.
 * @file This file implements the ActorElement class.
 * @author Ryan Lamb
 * @since 5/25/2018
 */

import Actor from '../draw/actor';
import Element from 'element';
import ActorStyle from '../styles/actorStyle'

/**
 * Class which represents an actor element in a sequence diagram.
 * Elements contain the relationships between the different elements of the sequence diagram.
 */
export default class ActorElement extends Actor implements Element {

    /**
     * Construct an instance of the ActorElement
     * @param {string} name The name of the actor.
     * @param {ActorStyle} style The style for the actor.
     * @param draw The draw class to render the actor with.
     */
    constructor(name: string, style: ActorStyle, draw: any) {
        super(name, style, draw);
    }

    /**
     * {@inheritDoc}
     */
    reflow() {
    }
}