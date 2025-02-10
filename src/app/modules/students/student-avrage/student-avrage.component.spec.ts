import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAvrageComponent } from './student-avrage.component';

describe('StudentAvrageComponent', () => {
  let component: StudentAvrageComponent;
  let fixture: ComponentFixture<StudentAvrageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAvrageComponent]
    });
    fixture = TestBed.createComponent(StudentAvrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
