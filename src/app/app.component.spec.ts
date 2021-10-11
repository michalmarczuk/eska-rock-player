import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { Observable, Subject, timer } from "rxjs";
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ISongs } from './app.interfaces';
import { PlayingStatus } from './app.playingStatus.service';
import { Songs } from './app.songs.service';
import { take } from 'rxjs/operators';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ 
        PlayingStatus,
        Songs,
        AppComponent
      ],
      imports: [HttpClientModule, HttpClientTestingModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'eska-rock-player'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('eska-rock-player');
  });

  it('should render title', inject([HttpTestingController, Songs],
    async (httpMock: HttpTestingController) => {

    // service.get.subscribe(data => console.log(data));
    const req = httpMock.expectOne(`http://localhost:4200/eska_api/combine.jsonp?callback=jsonp`);
    req.flush({data: {
      xcurrent: {
        image: 'image',
        artist: 'artists',
        song: 'song'
      },
      last: {
        image: 'image',
        artist: 'artists',
        song: 'song'
      }
    }});

    httpMock.verify();

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;


    // const httpMock = fixture.debugElement.injector.get(HttpTestingController);


    // app.songs = {
    //   current: {
    //     image: 'image',
    //     artist: 'artists',
    //     song: 'song'
    //   },
    //   last: {
    //     image: 'image',
    //     artist: 'artists',
    //     song: 'song'
    //   }
    // }

    fixture.detectChanges();

    await timer(3000).pipe(take(1)).toPromise();

    expect(fixture.nativeElement.querySelector('div.rectangleRight').textContent).toContain('Wcześniej grało:');
  }));
});


