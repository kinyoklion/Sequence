/**
 * Defines the actor style.
 *
 * @file This file defines the ActorStyle class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */

/**
 * Class which contains style information for actors.
 */
export default class ActorStyle {
    /**
     * Construct an ActorStyle instance.
     * @param {string} color The color to use for the actor.
     * @param {number} width The default width of the actor.
     * @param {number} height The default height of the actor.
     * @param {number} fontSize Font size to use for the actor label.
     */
    constructor(public color: string,
                public width: number,
                public height: number,
                public fontSize: number) {
    }
}