import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PauseButtonComponent } from './controlComponents/pause-button/pause-button.component';
import { PlayingStatus } from './app.playingStatus.service';
import { ProgressBarComponent } from './controlComponents/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PauseButtonComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PlayingStatus],
  bootstrap: [AppComponent]
})
export class AppModule { }
