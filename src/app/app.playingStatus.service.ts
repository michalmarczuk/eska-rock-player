export class PlayingStatus {
    private status: Status;

    constructor() {
        this.status = Status.pause;
    }

    get() {
        return this.status;
    }

    toggle() {
        if (this.status === Status.play) {
            this.status = Status.pause;
        } else {
            this.status = Status.play;
        }
    }
}

export enum Status {
    play,
    pause,
}