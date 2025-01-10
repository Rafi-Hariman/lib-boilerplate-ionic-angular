import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RingtonePage } from './ringtone.page';

describe('RingtonePage', () => {
  let component: RingtonePage;
  let fixture: ComponentFixture<RingtonePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RingtonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
