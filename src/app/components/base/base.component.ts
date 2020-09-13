import { Resposta } from "src/app/models/respostas/resposta";
import { OnInit, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

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

  getGroup(resposta: Resposta): FormGroup {
    return (this.group.get(resposta.getComponentName()) as FormGroup);
  }

}
