import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { interval, timer, range, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ISongs } from './app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('player') player: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar') progressBar: ElementRef;
  title: string = 'eska-rock-player';
  
  // Consider moving it to another component
  private playIcon: string = '/assets/images/play.png';
  private stopIcon: string = '/assets/images/stop.png';
  status: string = 'pause';
  controlButtonimage: string = this.playIcon;
  getSongsInterval: Subscription;
  songs: ISongs;

  progress: number = 0;
  progressBarText: string = '';
  progressBarInterval: Subscription;

  pauseButtonEnabled: boolean = false;
  pauseTimer: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadSongs();
    this.getSongsInterval = interval(15000).subscribe(() => this.loadSongs());
  }

  ngOnDestroy() {
    this.getSongsInterval.unsubscribe();
  }

  onCLickPlayStop() {
    this.player.nativeElement.src = 'https://uk2-play.adtonos.com/8104/eska-rock';
    this.status = this.status === 'play' ? 'pause' : 'play';
    this.controlButtonimage = this.status === 'play' ? this.stopIcon : this.playIcon;
    this.player.nativeElement[this.status]();

    this.pauseButtonEnabled = !this.pauseButtonEnabled;
    if (this.status === 'play' && this.pauseTimer) this.pauseTimer.unsubscribe();
    if (this.status === 'play' && this.progressBarInterval) { 
      this.progressBarInterval.unsubscribe();
      this.progressBarText = '';
      this.progress = 0;
    }
  }

  onClickPause(seconds: number) {
    if (this.pauseButtonEnabled) {
      const interval: number = 1000;
      this.onCLickPlayStop();

      this.pauseTimer = timer(seconds * interval).subscribe(() => this.onCLickPlayStop());
      this.progressBarInterval = timer(seconds, interval).pipe(map((i) => seconds - i)).pipe(take(seconds)).subscribe((x) => {
        this.progressBarText = `${Math.floor(x / 60).toString().padStart(2, '0')}:${(x % 60).toString().padStart(2, '0')}`;
        this.progress = x * 100 / seconds;
      });
    }
  }

  private loadSongs() {
    this.http.get('http://localhost:4200/eska_api/combine.jsonp?callback=jsonp', {responseType: 'text'}).subscribe(data => {
      const songDetails = data.slice('jsonp('.length, -2);

      const jsonResponseData: any = JSON.parse(songDetails);
      const eskaRockSongs: JSON = jsonResponseData['108']['songs'];

      const currentSongName: string = eskaRockSongs[0]['name'];
      const currentArtistName: string = eskaRockSongs[0]['artists'][0]['name'];
      const currentSongImage: string = eskaRockSongs[0]['images']['200x200'];

      const lastSongName: string = eskaRockSongs[1]['name'];
      const lastArtistName: string = eskaRockSongs[1]['artists'][0]['name'];
      const lastSongImage: string = eskaRockSongs[1]['images']['200x200'];
      
      console.log(`Current: ${currentArtistName}, ${currentSongImage}`);
      console.log(`Last: ${lastArtistName}, ${lastSongImage}`);

      this.songs = {
        current: {
          image: currentSongImage.replace('Q/k/s', 'g/F/s').replace('ru-0-ra-200,200-n', 'ru-1-r-512,512-n'),
          artist: currentArtistName,
          song: currentSongName,
        },
        last: {
          image: lastSongImage,
          artist: lastArtistName,
          song: lastSongName,
        }
      }
    });
  }
}
