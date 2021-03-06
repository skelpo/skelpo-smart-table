import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
  selector: 'table-cell-edit-mode',
  template: `
      <div [ngSwitch]="getEditorType()">
        <table-cell-custom-editor *ngSwitchCase="'custom'"
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="onEdited($event)">
        </table-cell-custom-editor>
        <table-cell-default-editor *ngSwitchDefault
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="onEdited($event)">
        </table-cell-default-editor>
      </div>
    `,
})
export class EditCellComponent implements OnInit {

  @Input() cell!: Cell;
  @Input() inputClass: string = '';

  @Output() edited = new EventEmitter<any>();

  ngOnInit(): void {
    this.cell.resetValue();
  }

  onEdited(event: any): boolean {
    this.edited.next(event);
    return false;
  }

  getEditorType(): string {
    const editor = this.cell.getColumn().editor
    if (!editor) {
      return 'default';
    }
    return editor.type;
  }
}
