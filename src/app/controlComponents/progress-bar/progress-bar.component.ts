import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayingStatus, Status } from 'src/app/app.playingStatus.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  progress: number = 0;
  progressBarText: string = '';

  constructor(private playingStatus: PlayingStatus) { }

  ngOnInit(): void {
    this.playingStatus.progressBar.subscribe((data) => {
      this.progressBarText = data.progressBarText;
      this.progress = data.progress;
    });
  }

  ngOnDestroy() {
    this.playingStatus.progressBar.unsubscribe();
  }

}
