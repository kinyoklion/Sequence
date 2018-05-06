/**
 * Contains dashed line style information.
 *
 * @file Contains the implementation of the DashStyle class.
 * @author Ryan Lamb
 * @since 5/6/2018
 */

/**
 * Contains style information for dashed lines.
 */
export default class DashStyle {
    /**
     * Construct a DashStyle instance.
     * @param {number} dashLength The length of dahses.
     * @param {number} dashSpace The space between dashes.
     */
    constructor(public dashLength: number, public dashSpace: number) {
    }
}