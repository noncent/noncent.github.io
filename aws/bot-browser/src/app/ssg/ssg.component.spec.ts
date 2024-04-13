import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsgComponent } from './ssg.component';

describe('SsgComponent', () => {
  let component: SsgComponent;
  let fixture: ComponentFixture<SsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
