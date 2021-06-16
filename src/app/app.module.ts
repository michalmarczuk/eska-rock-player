import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PauseButtonComponent } from './controlComponents/pause-button/pause-button.component';
import { PlayingStatus } from './app.playingStatus.service';
import { ProgressBarComponent } from './controlComponents/progress-bar/progress-bar.component';
import { StartStopButtonComponent } from './controlComponents/start-stop-button/start-stop-button.component';

@NgModule({
  declarations: [
    AppComponent,
    PauseButtonComponent,
    ProgressBarComponent,
    StartStopButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PlayingStatus],
  bootstrap: [AppComponent]
})
export class AppModule { }
