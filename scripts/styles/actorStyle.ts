/**
 * Defines the actor style class.
 *
 * @file This file defines the ActorStyle class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */

import TextStyle from "./textStyle";

/**
 * Class which contains style information for actors.
 */
export default class ActorStyle implements TextStyle {
    /**
     * Construct an ActorStyle instance.
     * @param {string} color The color to use for the actor.
     * @param {number} width The default width of the actor.
     * @param {number} height The default height of the actor.
     * @param {number} fontSize Font size to use for the actor label.
     * @param {number} spacing The space to put between actors.
     * @param {number} borderWidth The width of the actor border.
     */
    constructor(public color: string,
                public width: number,
                public height: number,
                public fontSize: number,
                public spacing: number,
                public borderWidth: number) {
    }
}