import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycommentsPage } from './mycomments.page';

describe('MycommentsPage', () => {
  let component: MycommentsPage;
  let fixture: ComponentFixture<MycommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycommentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
