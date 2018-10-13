import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css']
})
export class RadiobuttonComponent implements OnInit {

  resposta: Resposta;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
