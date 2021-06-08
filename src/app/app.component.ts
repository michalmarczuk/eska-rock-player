import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISongs } from './app.interfaces';
import { PlayingStatus, Status } from './app.playingStatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('player') player: ElementRef<HTMLAudioElement>;
  title: string = 'eska-rock-player';
  
  // Consider moving it to another component
  private playIcon: string = '/assets/images/play.png';
  private stopIcon: string = '/assets/images/stop.png';
  controlButtonimage: string = this.playIcon;
  getSongsInterval: Subscription;
  songs: ISongs;
  radioUrl: string;

  constructor(private http: HttpClient, private playingStatus: PlayingStatus) { }

  ngOnInit() {
    this.http.get('http://localhost:4200/radio_url').subscribe(data => this.radioUrl = data['url']);
    this.loadSongs();
    this.getSongsInterval = interval(15000).subscribe(() => this.loadSongs());

    this.playingStatus.radioStatus.subscribe((playingStatus) => {
      this.player.nativeElement.src = this.radioUrl;
      this.controlButtonimage = playingStatus === Status.play ? this.stopIcon : this.playIcon;
      this.player.nativeElement[Status[playingStatus]]();

      if (playingStatus === Status.play) { 
        this.playingStatus.progressBarStop();
      }
    });
  }

  ngOnDestroy() {
    this.getSongsInterval.unsubscribe();
    this.playingStatus.radioStatus.unsubscribe();
  }

  onCLickPlayStop() {
    if (this.controlButtonimage === this.playIcon) {
      this.playingStatus.play();
    } else {
      this.playingStatus.pause();
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
