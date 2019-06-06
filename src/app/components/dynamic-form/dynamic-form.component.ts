import { PerguntaAnexo } from './../../models/perguntas/pergunta-anexo';
import { FileUploadComponent } from './../file-upload/file-upload.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import { RespostaModeloFormulario } from 'src/app/models/resposta-modelo-formulario';
import { TipoPergunta } from 'src/app/models/enumeradores/tipo-pergunta.enum';
import { RespostaTexto } from 'src/app/models/respostas/resposta-texto';
import { RespostaUnicaOpcao } from 'src/app/models/respostas/resposta-unica-opcao';
import { RespostaData } from 'src/app/models/respostas/resposta-data';
import { RespostaGradeOpcoes } from 'src/app/models/respostas/resposta-grade-opcoes';
import { RespostaNumero } from 'src/app/models/respostas/resposta-numero';
import { RespostaMultiplaOpcao } from 'src/app/models/respostas/resposta-multipla-opcao';
import { PerguntaMultiplaEscolha } from 'src/app/models/perguntas/pergunta-multipla-escolha';
import { Opcao } from 'src/app/models/perguntas/opcao';
import { PerguntaGradeOpcoes } from 'src/app/models/perguntas/pergunta-grade-opcoes';
import { RespostaAnexo } from 'src/app/models/respostas/resposta-anexo';
import { BaseComponent } from '../base/base.component';
import { Resposta } from 'src/app/models/respostas/resposta';
import { error } from 'util';
import { Subscription } from 'rxjs';
import { FormControlCreator } from './form-control-creator';

@Component({
  exportAs: 'dynamicForm',
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: []
})

export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() respostaFormulario: RespostaModeloFormulario;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  private components: BaseComponent[] = [];
  private subscriptions: Subscription[] = [];
  private formControlCreator: FormControlCreator;

  get value() {
    return this.form.value;
  }

  get valid() {
    return this.form.valid;
  }

  constructor(private fb: FormBuilder) {
    this.formControlCreator = new FormControlCreator(fb, this.components);
  }

  ngOnInit() {
    this.form = this.createForm();
  }

  ngOnDestroy() {
    //Unsubscribe all control subscribers
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  componentCreate(event: any) {
    this.components.push(event);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createForm() {
    const group = this.fb.group({});
    
    if (this.respostaFormulario != null) {
      this.respostaFormulario.respostas.forEach(resposta => {
        const tuple = this.formControlCreator.createControl(resposta);
        const control = tuple.control;
        //Push control subscriptions
        tuple.subscriptions.forEach(x => this.subscriptions.push(x));

        //Habilita ou desabilita pergunta condicional
        const sub = resposta.getSubjectVisible().subscribe((x: boolean) => {
          if (control as AbstractControl != null) {
            if (x === true) {
              control.enable();
            } else {
              control.disable();
            }
          }
        });

        this.subscriptions.push(sub);
        resposta.getSubjectVisible().next(resposta.getVisible());
        group.addControl(resposta.getComponentName(), control);

      });
    }

    return group;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
