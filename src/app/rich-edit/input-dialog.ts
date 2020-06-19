import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Dialog } from './tools';

@Component({
  selector: 'app-input-dialog',
  template: `
    <rich-modal [dialog]="dialog" 
      (onOk)="handleOk()"
      (onCancel)="handleCancel()">
      <ng-template ngFor let-item [ngForOf]="dialog.row" let-i="index">
        <input [type]="item.type" *ngIf="item.type === 'input'" class="rich-input"
        autofocus placeholder="{{'请输入' + item.title}}"
        (keyup.enter)="nextInput(i)"
        [(ngModel)]="item.value" />
      </ng-template>
    </rich-modal>
  `,
  styleUrls: ['./rich.scss']
})
export class InputDialogComponent {

  constructor() { }
  @Input() dialog: Dialog;
  @Output() insertChange: EventEmitter<any> = new EventEmitter();

  handleOk() {
    this.insertChange.emit(this.dialog.row);
    this.dialog.isVisible = false;
  }
  handleCancel() {
    this.dialog.isVisible = false;
  }
  nextInput(i: number) {
    if (i === this.dialog.row.length - 1) {
      this.handleOk();
    }
  }
}
