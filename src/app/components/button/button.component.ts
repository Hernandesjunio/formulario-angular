import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  resposta: Resposta;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
