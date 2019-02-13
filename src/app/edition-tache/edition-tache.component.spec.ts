import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionTacheComponent } from './edition-tache.component';

describe('EditionTacheComponent', () => {
  let component: EditionTacheComponent;
  let fixture: ComponentFixture<EditionTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
