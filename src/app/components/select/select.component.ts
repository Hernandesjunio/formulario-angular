import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  resposta: Resposta;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
