/**
 * Implementation of an arrow style.
 *
 * @file This file implements the ArrowStyle class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */
import DashStyle from './dashStyle';

/**
 * Class containing arrow style information.
 */
export default class ArrowStyle {
    /**
     * Construct an instance of the ArrowStyle class.
     * @param {number} width The width of the line the arrow uses.
     * @param {string} backgroundColor The background color for the arrow label.
     * @param {DashStyle} dash Optional dashed line styling information.
     */
    constructor(public width: number,public backgroundColor: string, public dash?: DashStyle) {
    }
}