import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypointsPage } from './mypoints.page';

describe('MypointsPage', () => {
  let component: MypointsPage;
  let fixture: ComponentFixture<MypointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
