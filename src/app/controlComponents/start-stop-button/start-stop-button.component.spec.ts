import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayingStatus } from 'src/app/app.playingStatus.service';

import { StartStopButtonComponent } from './start-stop-button.component';

describe('StartStopButtonComponent', () => {
  let component: StartStopButtonComponent;
  let fixture: ComponentFixture<StartStopButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartStopButtonComponent ],
      providers: [ PlayingStatus ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No name', () => {
    expect(fixture.nativeElement.querySelector('img').getAttribute('alt')).toEqual('controlButton');
  });
});
