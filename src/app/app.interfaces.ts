export interface ISong {
    image: string,
    artist: string,
    song: string
}

export interface ISongs {
    current: ISong,
    last: ISong
}

export interface IProgressBar {
    progress: number,
    progressBarText: string
}