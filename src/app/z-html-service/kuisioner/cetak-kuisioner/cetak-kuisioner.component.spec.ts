/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CetakKuisionerComponent } from './cetak-kuisioner.component';

describe('CetakKuisionerComponent', () => {
  let component: CetakKuisionerComponent;
  let fixture: ComponentFixture<CetakKuisionerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CetakKuisionerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CetakKuisionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
