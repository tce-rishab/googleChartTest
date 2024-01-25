import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchartComponent } from './editchart.component';

describe('EditchartComponent', () => {
  let component: EditchartComponent;
  let fixture: ComponentFixture<EditchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
