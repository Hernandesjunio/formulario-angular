import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-multiple-line-radiobutton',
  templateUrl: './multiple-line-radiobutton.component.html',
  styleUrls: ['./multiple-line-radiobutton.component.css']
})
export class MultipleLineRadiobuttonComponent extends BaseComponent {

  constructor() {
    super();
  }

  getGroup(resposta: string): FormGroup {
    return this.group.get(resposta) as FormGroup;
  }

}
