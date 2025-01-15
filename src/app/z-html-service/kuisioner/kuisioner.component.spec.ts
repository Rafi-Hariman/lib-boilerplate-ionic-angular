/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KuisionerComponent } from './kuisioner.component';

describe('KuisionerComponent', () => {
  let component: KuisionerComponent;
  let fixture: ComponentFixture<KuisionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KuisionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KuisionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
