/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditPillComponent } from './edit-pill.component';

describe('EditPillComponent', () => {
  let component: EditPillComponent;
  let fixture: ComponentFixture<EditPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
