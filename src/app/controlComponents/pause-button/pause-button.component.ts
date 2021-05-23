import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { PlayingStatus, Status } from 'src/app/app.playingStatus.service';

@Component({
  selector: 'app-pause-button',
  templateUrl: './pause-button.component.html',
  styleUrls: ['./pause-button.component.css']
})
export class PauseButtonComponent {
  @Input() seconds: number;
  @Input() label: string;
  enabled: boolean;

  constructor(private playingStatus: PlayingStatus) { 
    playingStatus.radioStatus.subscribe(status => {
      this.enabled = status === Status.play;
    });
  }

  onClickPause() {
    if (this.enabled) {
      this.playingStatus.pause();
      this.playingStatus.progressBarStart(this.seconds);
    }
  }
}
