import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent extends BaseComponent {

  getOpcoesSelecionadas(formArray: FormArray, arrayObject: any[], projection: string) {
    const selected = [];
    formArray.controls.forEach((control, i) => {
      if (control.value === true) {
        selected.push(arrayObject[i]);
      }
    });

    return selected.map(c => c[projection]);
  }

}
