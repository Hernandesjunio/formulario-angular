import { Resposta } from "src/app/models/respostas/resposta";
import { OnInit, Component } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-button',
  template: ''  
})
export class BaseComponent implements OnInit {

  resposta: Resposta;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
