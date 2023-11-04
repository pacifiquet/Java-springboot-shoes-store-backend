import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetSaveComponent } from './password-reset-save.component';

describe('PasswordResetSaveComponent', () => {
  let component: PasswordResetSaveComponent;
  let fixture: ComponentFixture<PasswordResetSaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetSaveComponent]
    });
    fixture = TestBed.createComponent(PasswordResetSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
