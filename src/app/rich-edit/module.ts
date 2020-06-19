import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RichEditComponent } from './rich-edit';
import { InputDialogComponent } from './input-dialog';
import { RichModalComponent } from './rich-modal';
import { TabSetComponent } from './tab-set';
import { SelectImageComponent } from './select-image';
import { RichTabComponent } from './rich-tab';
import { RichTabServeService } from './rich-tab.service';

const componets = [
  RichEditComponent,
  InputDialogComponent,
  RichModalComponent,
  SelectImageComponent,
  TabSetComponent,
  RichTabComponent
];

@NgModule({
  declarations: [
    ...componets
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ...componets
  ],
  providers: [ RichTabServeService ]
})
export class RichEditModule { }
