import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTimelineDemoComponent } from './google-timeline-demo.component';

describe('GoogleTimelineDemoComponent', () => {
  let component: GoogleTimelineDemoComponent;
  let fixture: ComponentFixture<GoogleTimelineDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleTimelineDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTimelineDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
