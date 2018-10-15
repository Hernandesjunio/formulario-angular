import { PerguntaMultiplaEscolha } from './models/perguntas/pergunta-multipla-escolha';
import { Subject } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { TipoOperacaoCondicional } from './models/enumeradores/tipo-operacao-condicional.enum';
import { TipoPergunta } from './models/enumeradores/tipo-pergunta.enum';
import { RespostaModeloFormulario } from './models/resposta-modelo-formulario';
import { PerguntaTexto } from './models/perguntas/pergunta-texto';
import { ModeloFormulario } from './models/modelo-formulario';
import { RespostaTexto } from './models/respostas/resposta-texto';
import { LeiautePergunta } from './models/leiaute-pergunta';
import { Opcao } from './models/perguntas/opcao';
import { RespostaMultiplaOpcao } from './models/respostas/resposta-multipla-opcao';
import { PerguntaCondicionalTexto } from './models/perguntas/condicional/pergunta-condicional-texto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(fb: FormBuilder) {

    this.respostaFormulario.modeloFormulario = new ModeloFormulario();
    this.respostaFormulario.modeloFormulario.titulo = 'Modelo de Formulário';

    const pTexto = new PerguntaTexto();
    pTexto.descricao = 'Nome';
    pTexto.titulo = 'nome';
    pTexto.perguntaID = 1;

    pTexto.leiautesPergunta.push(new LeiautePergunta());

    const pTexto2 = new PerguntaTexto();
    pTexto2.descricao = 'Condicional';
    pTexto2.titulo = 'Condicional';
    pTexto2.perguntaID = 2;
    const pCondicional2 = new PerguntaCondicionalTexto();
    pCondicional2.perguntaID = 1;
    pCondicional2.perguntaCondicionalID = 1;
    pCondicional2.operacaoCondicional = TipoOperacaoCondicional.Texto_Igual;
    pCondicional2.tipoPergunta = TipoPergunta.Texto;
    pCondicional2.valorAtivacao = 'Ativa';
    pTexto2.perguntaCondicional = pCondicional2;

    const pMultipla1 = new PerguntaMultiplaEscolha();
    pMultipla1.perguntaID = 3;
    pMultipla1.descricao = 'Multipla';
    pMultipla1.titulo = 'Multipla';

    const opcao1 = new Opcao();
    opcao1.opcaoID = 20;
    opcao1.descricao = 'Op1';

    const opcao2 = new Opcao();
    opcao2.opcaoID = 21;
    opcao2.descricao = 'Op2';

    pMultipla1.opcoes.push(opcao1);
    pMultipla1.opcoes.push(opcao2);

    this.respostaFormulario.modeloFormulario.perguntas.push(pTexto);
    this.respostaFormulario.modeloFormulario.perguntas.push(pTexto2);
    this.respostaFormulario.modeloFormulario.perguntas.push(pMultipla1);

    const r1 = new RespostaTexto(this.respostaFormulario, 1, 1);
    r1.valor = 'Meu Valor';
    this.respostaFormulario.respostas.push(r1);

    const r2 = new RespostaTexto(this.respostaFormulario, 2, 2);
    r2.valor = 'Outro valor';
    this.respostaFormulario.respostas.push(r2);

    const r3 = new RespostaMultiplaOpcao(this.respostaFormulario, 3, 3);
    r3.opcoes.push(21);
    this.respostaFormulario.respostas.push(r3);

    r1.getSubjectVisible().subscribe(x => {
      console.log('R1 : ', x);
    });

    r2.getSubjectVisible().subscribe(x => {
      console.log('R2 : ', x);
    });
  }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  respostaFormulario: RespostaModeloFormulario = new RespostaModeloFormulario();

  submit(value: any) { }
}
