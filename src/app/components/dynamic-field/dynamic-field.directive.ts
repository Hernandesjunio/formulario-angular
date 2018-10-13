import { Pergunta } from 'src/app/models/perguntas/pergunta';
import {  ComponentFactoryResolver,  ComponentRef,  Directive,  Input,  OnInit,  ViewContainerRef} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { Resposta } from 'src/app/models/respostas/resposta';

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  //@Input() field: FieldConfig;
  @Input() resposta: Resposta;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.resposta.pergunta.getTipoControle()]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.resposta = this.resposta;
    this.componentRef.instance.group = this.group;
  }
}
