import { FileUploadComponent } from './../file-upload/file-upload.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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

@Component({
  exportAs: 'dynamicForm',
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: []
})

export class DynamicFormComponent implements OnInit {
  @Input() respostaFormulario: RespostaModeloFormulario;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  private components: BaseComponent[] = [];

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createControl();
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

  createControl() {
    const group = this.fb.group({});

    if (this.respostaFormulario != null) {
      this.respostaFormulario.respostas.forEach(resposta => {
        let control = null;
        // Habilita ou desabilita pergunta condicional
        resposta.getSubjectVisible().subscribe((x: boolean) => {
          if (control as FormControl != null) {
            if (x === true) {
              control.enable();
            } else {
              control.disable();
            }
          }
        });
        resposta.getSubjectVisible().next(resposta.getVisible());

        if (resposta.getPergunta().tipoPergunta === TipoPergunta.Texto) {
          const rTexto = resposta as RespostaTexto;
          control = this.fb.control(rTexto.valor,
            this.bindValidations(resposta.getValidations() || []));
          control.valueChanges.debounceTime(500).subscribe(x => { rTexto.setValor(x); });
        } else if (resposta.getPergunta().tipoPergunta === TipoPergunta.EscolhaUnica) {
          const rEscolhaUnica = resposta as RespostaUnicaOpcao;
          control = this.fb.control(rEscolhaUnica.opcaoID,
            this.bindValidations(resposta.getValidations() || []));
          control.valueChanges.debounceTime(500).subscribe(x => { rEscolhaUnica.setOpcaoID(x); });
        } else if (resposta.getPergunta().tipoPergunta === TipoPergunta.MultiplaEscolha) {
          const rMultiplaEscolha = resposta as RespostaMultiplaOpcao;
          const pMultipla = rMultiplaEscolha.getPergunta() as PerguntaMultiplaEscolha;

          const controls = pMultipla.opcoes.map((x, i) => {
            let selected = false;
            if (rMultiplaEscolha.opcoes.findIndex(d => d === x.opcaoID) > -1) {
              selected = true;
            }
            return this.fb.control(selected);
          });

          control = this.fb.array(controls,
            this.bindValidations(resposta.getValidations() || []));
          control.valueChanges.debounceTime(500).subscribe(x => {
            rMultiplaEscolha.setOpcoes(x)
          });

        } else if (resposta.getPergunta().tipoPergunta === TipoPergunta.Numero) {
          const rNumero = resposta as RespostaNumero;
          control = this.fb.control(rNumero.valor,
            this.bindValidations(resposta.getValidations() || []));
          control.valueChanges.debounceTime(500).subscribe(x => { rNumero.setValor(x); });
        } else if (resposta.getPergunta().tipoPergunta === TipoPergunta.Data) {
          const rData = resposta as RespostaData;
          control = this.fb.control(rData.valor,
            this.bindValidations(resposta.getValidations() || []));
          control.valueChanges.debounceTime(500).subscribe(x => { rData.setValor(x); });
        } else if (resposta.getPergunta().tipoPergunta === TipoPergunta.Grade) {
          const rGrade = resposta as RespostaGradeOpcoes;
          const controls = rGrade.respostaLinhaPerguntaGrade.map(linha => {
            const linhaControl = this.fb.control(linha.opcaoRespondidaID,
              this.bindValidations(resposta.getValidations() || []));
            linhaControl.valueChanges.debounceTime(500).subscribe(x => { console.log(x); rGrade.setRespostaGrade(linha); });
            return linhaControl;
          });
          control = this.fb.array(controls);
        } else if (resposta.getPergunta().tipoPergunta == TipoPergunta.Anexo) {
          const rAnexo = resposta as RespostaAnexo;
          control = this.fb.control(rAnexo.valor.name,
            this.bindValidations(resposta.getValidations() || []));
       
          control.valueChanges.debounceTime(500)
            .subscribe((x, y, z) => {
              const c = this.components.find(x=>x.resposta.getPergunta().perguntaID === rAnexo.perguntaID) as FileUploadComponent;
              rAnexo.setValor(c.file.nativeElement.files[0]);
              console.log(c.file.nativeElement.files[0]);              
            });
        } else {
          throw new Error('Não implementado');
        }
        
        group.addControl(resposta.getComponentName(), control);
      });
    }

    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
