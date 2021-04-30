import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PauseButtonComponent } from './controlComponents/pause-button/pause-button.component';
import { PlayingStatus } from './app.playingStatus.service';

@NgModule({
  declarations: [
    AppComponent,
    PauseButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PlayingStatus],
  bootstrap: [AppComponent]
})
export class AppModule { }
