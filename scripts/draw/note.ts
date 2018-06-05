/**
 * @file This file implements the Note class.
 * @author Ryan Lamb
 * @since 5/25/2018
 */

import NoteStyle from "../styles/noteStyle";

/**
 * Class which represents a note in a sequence diagram.
 */
export default class Note {
   private readonly rect: any;
   private readonly text: any;
   protected readonly group: any;
   readonly height: number;

   constructor(public note: string, public style: NoteStyle, protected draw: any) {
       this.text = draw.text(note);
       // noinspection TypeScriptValidateJSTypes
       this.text.font({anchor: 'middle', leading: '1.0em', size: style.fontSize});
       const textBounds = this.text.rbox(this.draw);
       // noinspection TypeScriptValidateJSTypes
       const pad = 2 * style.borderPad;
       this.rect = draw.rect(textBounds.width + pad, textBounds.height + pad).attr({fill: style.color})
           .stroke({width: style.borderWidth});
       this.rect.move(textBounds.x - style.borderPad, textBounds.y - style.borderPad);
       this.group = draw.group();

       this.group.add(this.rect);
       this.group.add(this.text);
       this.height = this.group.rbox(this.draw).height;
   }

    /**
     * Move the position of the note.
     * @param {number} x The new x position for the note.
     * @param {number} y The new y position for the note.
     */
   protected move(x: number, y: number) {
       this.group.move(x, y);
   }
}