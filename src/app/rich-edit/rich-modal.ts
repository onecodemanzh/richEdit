import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dialog } from './tools';

@Component({
  selector: 'rich-modal, [rich-modal]',
  template: `
    <div *ngIf="dialog.isVisible" role="dialog" tabindex="-1" class="rich-modal-wrap" style="z-index: 1000;">
      <div role="document" class="rich-modal" style="width: 520px; transform-origin: 0px 0px 0px;">
          <div class="rich-modal-content">
              <button aria-label="Close" class="rich-modal-close ">
                  <span class="rich-modal-close-x">
                      <i (click)="cancel()" class="anticon rich-modal-close-icon anticon-close"
                          type="close">
                          <svg viewBox="64 64 896 896" fill="currentColor" width="1em" height="1em" data-icon="close"
                              aria-hidden="true">
                              <path
                                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                              </path>
                          </svg>
                      </i>
                  </span>
              </button>

              <div class="rich-modal-header ">
                  <div class="rich-modal-title">
                      <div>{{dialog.title}}</div>
                  </div>
              </div>
              <div class="rich-modal-body ">
                  <ng-content></ng-content>
              </div>

              <div class="rich-modal-footer">
                  <button class="rich-btn rich-btn-primary" (click)="ok()" *ngIf="dialog.okBtnText">
                      <span>{{dialog.okBtnText}}</span>
                  </button>
                  <button class="rich-btn rich-btn-default" (click)="cancel()" *ngIf="dialog.cancelBtnText">
                      <span>{{dialog.cancelBtnText}}</span>
                  </button>
              </div>

          </div>
      </div>
      <div style="width: 0px; height: 0px; overflow: hidden;" tabindex="0">sentinel</div>
    </div>
  `,
  styleUrls: ['./rich.scss']
})
export class RichModalComponent implements OnInit {
  @Input() dialog: Dialog;
  @Output() onOk: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  ok(): void {
    this.onOk.emit();
  }
  cancel(): void {
    this.dialog.isVisible = false;
    this.onCancel.emit();
  }
}
