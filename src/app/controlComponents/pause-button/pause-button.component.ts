import { Input, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { PlayingStatus, Status } from 'src/app/app.playingStatus.service';

@Component({
  selector: 'app-pause-button',
  templateUrl: './pause-button.component.html',
  styleUrls: ['./pause-button.component.css']
})
export class PauseButtonComponent implements OnDestroy {
  @Input() seconds: number;
  @Input() label: string;
  enabled: boolean;

  constructor(private playingStatus: PlayingStatus) { 
    playingStatus.radioStatus.subscribe(status => {
      this.enabled = status === Status.play;
    });
  }

  ngOnDestroy() {
    this.playingStatus.radioStatus.unsubscribe();
  }

  onClickPause() {
    if (this.enabled) this.playingStatus.pause(this.seconds);
  }
}
