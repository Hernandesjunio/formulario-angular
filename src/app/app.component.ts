import { PerguntaUnicaEscolha } from './models/perguntas/pergunta-unica-escolha';
import { RespostaGradeOpcoes } from './models/respostas/resposta-grade-opcoes';
import { LinhaGrade } from './models/perguntas/linha-grade';
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
import { PerguntaGradeOpcoes } from './models/perguntas/pergunta-grade-opcoes';
import { RespostaLinhaPerguntaGrade } from './models/respostas/resposta-linha-pergunta-grade';
import { MatDialog } from '@angular/material';
import { PerguntaAnexo } from './models/perguntas/pergunta-anexo';
import { RespostaAnexo } from './models/respostas/resposta-anexo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(fb: FormBuilder, public dialog: MatDialog) {
    
    this.respostaFormulario.modeloFormulario = new ModeloFormulario();
    this.respostaFormulario.modeloFormulario.titulo = 'Modelo de Formulário';

    const pTexto = new PerguntaTexto();
    pTexto.descricao = 'Nome';
    pTexto.titulo = 'nome';
    pTexto.perguntaID = 1;
    pTexto.obrigatorio = true;

    pTexto.leiautesPergunta.push(new LeiautePergunta());

    const pTexto2 = new PerguntaTexto();
    pTexto2.descricao = 'Condicional';
    pTexto2.titulo = 'Condicional';
    pTexto2.perguntaID = 2;
    pTexto2.obrigatorio = true;

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
    pMultipla1.obrigatorio = true;

    const opcao1 = new Opcao();
    opcao1.opcaoID = 20;
    opcao1.descricao = 'Op1';

    const opcao2 = new Opcao();
    opcao2.opcaoID = 21;
    opcao2.descricao = 'Op2';

    pMultipla1.opcoes.push(opcao1);
    pMultipla1.opcoes.push(opcao2);

    const pGrade = new PerguntaGradeOpcoes();
    pGrade.perguntaID=4;
    pGrade.titulo="Conhecimentos";
    pGrade.descricao="Conhecimentos";

    const op1Grade = new Opcao();
    op1Grade.opcaoID = 30;
    op1Grade.descricao = 'Baixo';

    const op2Grade = new Opcao();
    op2Grade.opcaoID = 31;
    op2Grade.descricao = 'Médio';

    const op3Grade = new Opcao();
    op3Grade.opcaoID = 32;
    op3Grade.descricao = 'Avançado';

    pGrade.opcoes.push(op1Grade);
    pGrade.opcoes.push(op2Grade);
    pGrade.opcoes.push(op3Grade);

    const l1Grade = new LinhaGrade();
    l1Grade.descricao="C#";
    l1Grade.linhaID=1;

    pGrade.linhasGrade.push(l1Grade);

    const l2Grade = new LinhaGrade();
    l2Grade.descricao="JAVA";
    l2Grade.linhaID=2;

    pGrade.linhasGrade.push(l2Grade);

    const pAnexo = new PerguntaAnexo();
    pAnexo.descricao="Anexo";
    pAnexo.titulo="Anexo";
    pAnexo.perguntaID=5;
    //pAnexo.tipoPergunta = TipoPergunta.Anexo;
    //pAnexo.tamanhoMaximoBytes = 1024;
        

    this.respostaFormulario.modeloFormulario.perguntas.push(pTexto);
    this.respostaFormulario.modeloFormulario.perguntas.push(pTexto2);
    this.respostaFormulario.modeloFormulario.perguntas.push(pMultipla1);
    this.respostaFormulario.modeloFormulario.perguntas.push(pAnexo);
    
    const r1 = new RespostaTexto(this.respostaFormulario, 1, 1);
    r1.valor = 'Meu Valor';
    this.respostaFormulario.respostas.push(r1);

    const r2 = new RespostaTexto(this.respostaFormulario, 2, 2);
    r2.valor = 'Outro valor';
    this.respostaFormulario.respostas.push(r2);

    const r3 = new RespostaMultiplaOpcao(this.respostaFormulario, 3, 3);
    r3.opcoes.push(21);
    this.respostaFormulario.respostas.push(r3);
    
    const rlpg = new Array<RespostaLinhaPerguntaGrade>();

    const rlpg1 = new RespostaLinhaPerguntaGrade();
    rlpg1.linhaPerguntaGradeID=1;

    const rlpg2 = new RespostaLinhaPerguntaGrade();
    rlpg2.linhaPerguntaGradeID=2;

    rlpg.push(rlpg1);
    rlpg.push(rlpg2);

    this.respostaFormulario.modeloFormulario.perguntas.push(pGrade);
    const r4 = new RespostaGradeOpcoes(this.respostaFormulario,4,4, rlpg);
    r4.respostaLinhaPerguntaGrade[0].opcaoRespondidaID=30;
    r4.respostaLinhaPerguntaGrade[1].opcaoRespondidaID=31

    this.respostaFormulario.respostas.push(r4);

    const rAnexo = new RespostaAnexo(this.respostaFormulario,5,5);
    rAnexo.anexoID=0;
    this.respostaFormulario.respostas.push(rAnexo);

    // r1.getSubjectVisible().subscribe(x => {
    //   console.log('R1 : ', x);
    // });

    // r2.getSubjectVisible().subscribe(x => {
    //   console.log('R2 : ', x);
    // });
  }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  respostaFormulario: RespostaModeloFormulario = new RespostaModeloFormulario();

  submit(value: any) { }
}
