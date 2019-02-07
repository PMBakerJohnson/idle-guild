import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClickableComponent } from './clickable/clickable.component';
import { ResourceDisplayComponent } from './resource-display/resource-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickableComponent,
    ResourceDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
