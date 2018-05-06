/**
 * This file implements a basic sequence diagram for development purposes.
 *
 * @author Ryan Lamb
 * @since 5/6/2018
 */
import {Sequence} from 'sequence'

export function main() {
    const seq= new Sequence("diagram", 1000,1000);
    seq.addActor("First");
    seq.addActor("Second");
    seq.addActor("Third");
    //seq.lockSequenceNumber();
    seq.addArrow("First", "Second", false,"DoStuffSend()");
    //seq.addArrow("Second", "Third", false,"DoStuffSend()");
    //seq.unlockSequenceNumber();
    seq.addArrow("Second", "First", true,"DoStuffReply()");
    seq.addArrow("Third", "First", false,"LongWay");
}