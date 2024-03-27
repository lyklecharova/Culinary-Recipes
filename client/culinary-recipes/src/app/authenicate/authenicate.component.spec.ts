import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenicateComponent } from './authenicate.component';

describe('AuthenicateComponent', () => {
  let component: AuthenicateComponent;
  let fixture: ComponentFixture<AuthenicateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenicateComponent]
    });
    fixture = TestBed.createComponent(AuthenicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
