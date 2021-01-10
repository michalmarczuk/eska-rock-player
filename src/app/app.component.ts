import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('player') player: ElementRef<HTMLAudioElement>; 
  title = 'eska-rock-player';
  status = 'pause';

  onButtonCLick() {
    this.status = this.status === 'play' ? 'pause' : 'play';
    this.player.nativeElement[this.status]();
  }
}
