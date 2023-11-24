import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyUpdatedComponent } from './recently-updated.component';

describe('RecentlyUpdatedComponent', () => {
  let component: RecentlyUpdatedComponent;
  let fixture: ComponentFixture<RecentlyUpdatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentlyUpdatedComponent]
    });
    fixture = TestBed.createComponent(RecentlyUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
