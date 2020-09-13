import { Component } from '@angular/core';
import { PerguntaComOpcoes } from 'src/app/models/perguntas/pergunta-com-opcoes';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css']
})
export class RadiobuttonComponent extends BaseComponent {

  getPergunta(): PerguntaComOpcoes {
    return this.resposta.getPergunta() as PerguntaComOpcoes;
  }
}
