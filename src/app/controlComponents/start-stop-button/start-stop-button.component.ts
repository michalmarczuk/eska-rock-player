import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayingStatus, Status } from 'src/app/app.playingStatus.service';

@Component({
  selector: 'app-start-stop-button',
  templateUrl: './start-stop-button.component.html',
  styleUrls: ['./start-stop-button.component.css']
})
export class StartStopButtonComponent implements OnInit, OnDestroy {
  private playIcon: string = '/assets/images/play.png';
  private stopIcon: string = '/assets/images/stop.png';
  controlButtonimage: string = this.playIcon;

  constructor(private playingStatus: PlayingStatus) { }

  ngOnInit(): void {
    this.playingStatus.radioStatus.subscribe((playingStatus) => {
      this.controlButtonimage = playingStatus === Status.play ? this.stopIcon : this.playIcon;
    });
  }

  ngOnDestroy(): void {
    this.playingStatus.radioStatus.unsubscribe();
  }

  onCLickPlayStop() {
    if (this.controlButtonimage === this.playIcon) {
      this.playingStatus.play();
    } else {
      this.playingStatus.stop();
    }
  }
}
