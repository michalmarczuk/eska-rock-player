import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseButtonComponent } from './pause-button.component';

describe('PauseButtonComponent', () => {
  let component: PauseButtonComponent;
  let fixture: ComponentFixture<PauseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
