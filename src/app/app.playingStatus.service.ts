import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { timer, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IProgressBar } from "./app.interfaces";

@Injectable()
export class PlayingStatus {
    public progressBar: Subject<IProgressBar>;
    public radioStatus: Subject<Status>;

    private progressBarInterval: Subscription;
    private progressBarTimer: Subscription;
    private status: Status;

    constructor() {
        this.status = Status.pause;
        this.progressBar = new Subject<IProgressBar>();
        this.radioStatus = new Subject<Status>();
    }

    public play(): void {
        this.status = Status.play;
        this.radioStatus.next(this.status);

        this.progressBarStop();
    }

    public pause(seconds: number): void {
        this.status = Status.pause;
        this.radioStatus.next(this.status);

        this.progressBarStart(seconds);
    }

    public stop(): void {
        this.status = Status.pause;
        this.radioStatus.next(this.status);
    }

    private progressBarStop(): void {
        if (this.progressBarInterval) {
            this.progressBarInterval.unsubscribe();
            this.progressBarTimer.unsubscribe();
        }

        this.progressBar.next({progress: 0, progressBarText: ''});
    }

    private progressBarStart(seconds: number): void {
        const interval = 1000;
        
        this.progressBarInterval = timer(seconds, interval).pipe(map((i) => seconds - i)).pipe(take(seconds)).subscribe((x) => {
            const text: string = `${Math.floor(x / 60).toString().padStart(2, '0')}:${(x % 60).toString().padStart(2, '0')}`;
            const progress: number = x * 100 / seconds;

            this.progressBar.next({progress, progressBarText: text});
        });

        this.progressBarTimer = timer(seconds * interval).subscribe(() => {
            this.radioStatus.next(Status.play);
            this.progressBarStop();
        });
    }
}

export enum Status {
    play,
    pause,
}
