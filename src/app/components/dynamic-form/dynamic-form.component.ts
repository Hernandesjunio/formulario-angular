import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RespostaModeloFormulario } from "src/app/models/resposta-modelo-formulario";
import { TipoPergunta } from "src/app/models/enumeradores/tipo-pergunta.enum";
import { RespostaTexto } from "src/app/models/respostas/resposta-texto";

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  templateUrl: './dynamic-form.component.html',
  styles: []
})

export class DynamicFormComponent implements OnInit {
  @Input() respostaFormulario: RespostaModeloFormulario;

  //@Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createControl();
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
    console.log(this.respostaFormulario);
    if (this.respostaFormulario != null) {
      console.log('CreateControl2');
      console.log(this.respostaFormulario);
      this.respostaFormulario.respostas.forEach(resposta => {
        let control = null;
        //Habilita ou desabilita pergunta condicional
        resposta.getSubjectVisible().subscribe((x: boolean) => {
          if (x === true)
            control.enable();
          else
            control.disable();
        });
        
        if (resposta.pergunta.tipoPergunta === TipoPergunta.Texto) {
          let rTexto = resposta as RespostaTexto;          
          control = this.fb.control(rTexto.valor, 
          this.bindValidations(resposta.getValidations() || []));
          resposta.getSubjectVisible().next(resposta.getVisible());
          control.valueChanges.subscribe( x=> rTexto.setValor(x));
        }
        else {
          throw new Error("Não implementado");
        }

        group.addControl(`${resposta.pergunta.perguntaID}_${resposta.pergunta.titulo}`, control);
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
