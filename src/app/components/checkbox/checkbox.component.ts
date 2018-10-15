import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  resposta: Resposta;
  group: FormGroup;

  constructor() { }

  getOpcoesSelecionadas(formArray: FormArray, arrayObject: Number[], projection: string) {
    let selected = [];
    formArray.controls.forEach((control, i) => {
      if (control.value === true)
        selected.push(arrayObject[i]);
    });

    return selected.map(c=>c[projection]);
  }

  ngOnInit() {
  }

}
