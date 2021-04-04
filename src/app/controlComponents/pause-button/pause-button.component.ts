import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { interval, timer, range, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-pause-button',
  templateUrl: './pause-button.component.html',
  styleUrls: ['./pause-button.component.css']
})
export class PauseButtonComponent implements OnInit {
  @Output('playStop') playStop: EventEmitter<any> = new EventEmitter();

  pauseButtonEnabled: boolean = false;
  pauseTimer: Subscription;

  progress: number = 0;
  progressBarText: string = '';
  progressBarInterval: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  onClickPause(seconds: number) {
    console.log('pause Button clicked');
    this.playStop.emit();

    if (this.pauseButtonEnabled) {
      const interval: number = 1000;
      // this.onCLickPlayStop();
      this.playStop.emit();

      // this.pauseTimer = timer(seconds * interval).subscribe(() => this.onCLickPlayStop());
      this.pauseTimer = timer(seconds * interval).subscribe(() => this.playStop.emit());
      this.progressBarInterval = timer(seconds, interval).pipe(map((i) => seconds - i)).pipe(take(seconds)).subscribe((x) => {
        this.progressBarText = `${Math.floor(x / 60).toString().padStart(2, '0')}:${(x % 60).toString().padStart(2, '0')}`;
        this.progress = x * 100 / seconds;
      });
    }
  }
}
