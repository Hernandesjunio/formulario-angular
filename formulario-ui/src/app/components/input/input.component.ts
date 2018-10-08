import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

field: FieldConfig;
group:FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
