import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStopButtonComponent } from './start-stop-button.component';

describe('StartStopButtonComponent', () => {
  let component: StartStopButtonComponent;
  let fixture: ComponentFixture<StartStopButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartStopButtonComponent ]
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
});
