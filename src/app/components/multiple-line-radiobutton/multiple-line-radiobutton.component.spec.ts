import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLineRadiobuttonComponent } from './multiple-line-radiobutton.component';

describe('MultipleLineRadiobuttonComponent', () => {
  let component: MultipleLineRadiobuttonComponent;
  let fixture: ComponentFixture<MultipleLineRadiobuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleLineRadiobuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleLineRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
