import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { interval, timer, range, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PlayingStatus, Status } from 'src/app/app.playingStatus.service';

@Component({
  selector: 'app-pause-button',
  templateUrl: './pause-button.component.html',
  styleUrls: ['./pause-button.component.css']
})
export class PauseButtonComponent implements OnInit {
  @Output('playStop') playStop: EventEmitter<void> = new EventEmitter();
  @Output('progressBar') progressBar: EventEmitter<any> = new EventEmitter();
  @Input() enabled: boolean;

  pauseTimer: Subscription;

  progress: number = 0;
  progressBarText: string = '';
  progressBarInterval: Subscription;

  constructor(private playingStatus: PlayingStatus) { }

  ngOnInit(): void {
  }

  onClickPause(seconds: number) {
    if (this.enabled) {
      const interval: number = 1000;
      this.playStop.emit();

      this.pauseTimer = timer(seconds * interval).subscribe(() => this.playStop.emit());
      this.progressBarInterval = timer(seconds, interval).pipe(map((i) => seconds - i)).pipe(take(seconds)).subscribe((x) => {
        const text: string = `${Math.floor(x / 60).toString().padStart(2, '0')}:${(x % 60).toString().padStart(2, '0')}`;
        const progress: number = x * 100 / seconds;
        console.log(progress);
        this.progressBar.emit({text, progress});
      });
    }
  }
}
