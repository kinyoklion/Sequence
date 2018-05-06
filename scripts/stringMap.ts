/**
 * Interface for string to value maps.
 * @file This file implements the StringMap<T> interface.
 * @author Ryan Lamb
 * @since 5/6/2018
 */

/**
 * Interface which creates an object to use as a map with a constrained
 * key and value type.
 */
export default interface StringMap<T> {
    [K: string]: T;
}