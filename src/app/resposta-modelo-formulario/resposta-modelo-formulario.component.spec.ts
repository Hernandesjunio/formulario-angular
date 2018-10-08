import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespostaModeloFormularioComponent } from './resposta-modelo-formulario.component';

describe('RespostaModeloFormularioComponent', () => {
  let component: RespostaModeloFormularioComponent;
  let fixture: ComponentFixture<RespostaModeloFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespostaModeloFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespostaModeloFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
