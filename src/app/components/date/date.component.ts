import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  resposta: Resposta;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
