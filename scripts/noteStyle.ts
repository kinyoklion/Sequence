/**
 * Implementation of the note style class.
 *
 * @file This file implements the NoteStyle class.
 * @author Ryan Lamb
 * @since 5/25/2018
 */

import TextStyle from './textStyle';

/**
 * Class which contains style information for notes.
 */
export default class NoteStyle implements TextStyle {

    /**
     * Construct a NoteStyle instance.
     * @param {string} color The color to use for the note background.
     * @param {number} borderPad Pad distance between the text and the border.
     * @param {number} boderWidth The width of the border around the note.
     * @param {number} fontSize The size of the font for the note.
     */
    constructor(public color: string,
                public borderPad: number,
                public borderWidth: number,
                public fontSize: number) {
    }
}