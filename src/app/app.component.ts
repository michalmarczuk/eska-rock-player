import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISongs } from './app.interfaces';
import { PlayingStatus, Status } from './app.playingStatus.service';
import { Songs } from './app.songs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('player') player: ElementRef<HTMLAudioElement>;
  title: string = 'eska-rock-player';
  songs: ISongs;
  radioUrl: string;

  constructor(private http: HttpClient, private playingStatus: PlayingStatus, private songsService: Songs) { }

  ngOnInit() {
    this.http.get('http://localhost:4200/radio_url').subscribe(data => this.radioUrl = data['url']);

    this.playingStatus.radioStatus.subscribe((playingStatus) => {
      this.player.nativeElement.src = this.radioUrl;
      this.player.nativeElement[Status[playingStatus]]();
    });

    this.songsService.get.subscribe(songs => this.songs = songs);
  }

  ngOnDestroy() {
    this.playingStatus.radioStatus.unsubscribe();
    this.songsService.get.unsubscribe();
  }
}
