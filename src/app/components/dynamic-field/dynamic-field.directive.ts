import { BaseComponent } from './../base/base.component';
import { FileUploadComponent } from './../file-upload/file-upload.component';
import { MultipleLineRadiobuttonComponent } from './../multiple-line-radiobutton/multiple-line-radiobutton.component';
import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import { DateComponent } from '../date/date.component';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Resposta } from 'src/app/models/respostas/resposta';

const componentMapper = {
  file: FileUploadComponent,
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  multipleLineRadioButton: MultipleLineRadiobuttonComponent,
  checkbox: CheckboxComponent
};
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() resposta: Resposta;
  @Input() group: FormGroup;
  componentRef: any;
  @Output() componentCreateEvent = new EventEmitter();

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.resposta.getPergunta().getTipoControle()]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.resposta = this.resposta;
    this.componentRef.instance.group = this.group;
    this.componentCreateEvent.emit(this.componentRef.instance);
  }
}
