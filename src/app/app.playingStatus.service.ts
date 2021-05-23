import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { timer, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class PlayingStatus {
    private progressBarInterval: Subscription;
    private progressBarTimer: Subscription;
    public progressBar: Subject<IProgressBar>;
    private status: Status;
    public radioStatus: Subject<Status>;

    constructor() {
        this.status = Status.pause;
        this.progressBar = new Subject<IProgressBar>();
        this.radioStatus = new Subject<Status>();
    }

    progressBarStop() {
        if (this.progressBarInterval) {
            this.progressBarInterval.unsubscribe();
            this.progressBarTimer.unsubscribe();
        }

        this.progressBar.next({progress: 0, progressBarText: ''});
    }

    progressBarStart(seconds: number) {
        const interval = 1000;
        
        this.progressBarInterval = timer(seconds, interval).pipe(map((i) => seconds - i)).pipe(take(seconds)).subscribe((x) => {
            const text: string = `${Math.floor(x / 60).toString().padStart(2, '0')}:${(x % 60).toString().padStart(2, '0')}`;
            const progress: number = x * 100 / seconds;

            this.progressBar.next({progress, progressBarText: text});
        });

        this.progressBarTimer = timer(seconds * interval).subscribe(() => this.radioStatus.next(Status.play));
    }

    play() {
        this.status = Status.play;
        this.radioStatus.next(this.status);
    }

    pause() {
        this.status = Status.pause;
        this.radioStatus.next(this.status);
    }
}

export interface IProgressBar {
    progress: number,
    progressBarText: string
}

export enum Status {
    play,
    pause,
}