import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesPostsPage } from './likes-posts.page';

describe('LikesPostsPage', () => {
  let component: LikesPostsPage;
  let fixture: ComponentFixture<LikesPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
