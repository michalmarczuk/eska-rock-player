import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayingStatus } from 'src/app/app.playingStatus.service';

import { PauseButtonComponent } from './pause-button.component';

describe('PauseButtonComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PauseButtonComponent, TestHostComponent],
      providers: [ PlayingStatus ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create 79', () => {
    expect(testHostComponent).toBeTruthy();
    console.log('Great success');
  });

  it('Check something', () => {
    // testHostComponent.componentUnderTestComponent.input = 'different test input';
    testHostComponent.setLabel('doopa');
    testHostFixture.detectChanges();
    console.log('*****************************');
    console.log(testHostFixture.nativeElement.querySelector('pausebuttoncomponent').innerText);
    // expect(testHostFixture.nativeElement.querySelector('span.pauseLabel').innerText).toEqual('DIFFERENT TEST INPUT');
  });


});

@Component({
  selector: `host-component`,
  template: `<PauseButtonComponent [seconds]=20 [label]="doopa">some text</PauseButtonComponent>`
})
class TestHostComponent {
  private seconds: number;
  private label: string;

  setSeconds(seconds: number) {
    this.seconds = seconds;
  }

  setLabel(label: string) {
    this.label = label;
  }
}