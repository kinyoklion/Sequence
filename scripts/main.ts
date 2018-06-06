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
    //seq.addNote("First", "This note will be off screen.");
    seq.addActor("Second");
    seq.addActor("Third");
    //seq.lockSequence();
    seq.addArrow("First", "Second", false,"DoStuffSend()");
    seq.addArrow("Second", "Third", false,"DoStuffSend()");
    //seq.unlockSequence();
    seq.addArrow("Second", "First", true,"DoStuffReply()");
    seq.addArrow("Third", "First", false,"LongWay");
    seq.addNote("Second", "This is what a note looks like.\nThere can be multiple lines.+++++++++++++++++++++++");
    seq.addArrow("First", "Third", true,"LongWayBack");
    seq.addNote("Third", "Note on the other edge.");
    seq.reflow();
}