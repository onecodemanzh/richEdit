import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RichEditModule } from './rich-edit/module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RichEditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
