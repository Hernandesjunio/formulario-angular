import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resposta } from 'src/app/models/respostas/resposta';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

resposta: Resposta;
group:FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
