import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloFormularioComponent } from './modelo-formulario.component';

describe('ModeloFormularioComponent', () => {
  let component: ModeloFormularioComponent;
  let fixture: ComponentFixture<ModeloFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
