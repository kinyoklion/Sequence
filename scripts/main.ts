/**
 * This file implements a basic sequence diagram for development purposes.
 *
 * @author Ryan Lamb
 * @since 5/6/2018
 */
import {Sequence} from 'sequence'

export function main() {
    const seq= new Sequence("diagram", 2000,1000);
    seq.addActor("First");
    seq.addActor("Second");
    seq.addActor("Third");
    
    seq.addArrow("First", "Second", false,"DoStuffSend()");
    seq.addArrow("Second", "Third", false,"DoStuffSend()");

    seq.addArrow("Third", "Second", true,"DoStuffReply()");
    seq.addArrow("Second", "First", true,"DoStuffReply()");
    seq.addArrow("Third", "First", false,"LongWay");
    seq.addNote("Third", "Note on the other edge.");
    seq.addArrow("First", "Third", true,"LongWayBack");
    
    seq.lockSequence();
    seq.addArrow("First", "Second", false, "LockedSequence()");
    seq.addArrow("Second", "Third", false, "LockedSequence()");
    seq.unlockSequence();
    
    seq.addNote("Second", "Sequences can be locked to allow for\r\n multiple things happening at the same time.");
    
    seq.lockSequence();
    seq.addArrow("Third", "Second", true, "LockedSequence()");
    seq.addArrow("Second", "First", true, "LockedSequence()");
    seq.unlockSequence();
    
    //Without this the actors end at the last sequence they are attached to.
    seq.keepActorsActive(["First", "Second", "Third"]);

    seq.reflow();
}