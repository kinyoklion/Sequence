/**
 * This file contains the Element interface.
 *
 * @file Contains the Element interface.
 * @author Ryan Lamb
 * @since 5/26/2018
 */

/**
 * Interface containing common operations for elements.
 *
 * Elements contain the relationships between the sequence diagram.
 */
export default interface Element {
    /**
     * Reflow the element adjusting for any modified positions on which this element is dependent.
     */
    reflow();

    /**
     * Get the right side X position of the element.
     */
    getRightX();
}