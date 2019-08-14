import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcupPage } from './acup.page';

describe('AcupPage', () => {
  let component: AcupPage;
  let fixture: ComponentFixture<AcupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
