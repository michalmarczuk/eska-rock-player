import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISongs } from './app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('player') player: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar') progressBar: ElementRef;
  // Consider moving it to another component
  private playIcon: string = '/assets/images/play.png';
  private stopIcon: string = '/assets/images/stop.png';
  title: string = 'eska-rock-player';
  status: string = 'pause';
  controlButtonimage: string = this.playIcon;
  getSongsInterval: Subscription;
  songs: ISongs;
  progress: number = 80;

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit() {
    this.loadSongs();
    this.getSongsInterval = interval(15000).subscribe(() => this.loadSongs());
  }

  ngAfterViewInit() {
    this.renderer.setProperty(this.progressBar.nativeElement, 'innerHTML', 'Test');
  }

  ngOnDestroy() {
    this.getSongsInterval.unsubscribe();
  }

  onButtonCLick() {
    this.player.nativeElement.src = 'https://uk2-play.adtonos.com/8104/eska-rock';
    this.status = this.status === 'play' ? 'stop' : 'play';
    this.controlButtonimage = this.status === 'play' ? this.stopIcon : this.playIcon;
    this.player.nativeElement[this.status]();
  }

  loadSongs() {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  accept: 'text/plain'}),
      responseType: 'json'
    };

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
