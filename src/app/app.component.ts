import { PerguntaMultiplaEscolha } from './models/perguntas/pergunta-multipla-escolha';
import { Subject } from 'rxjs';
import { PerguntaCondicionalTexto } from './models/perguntas/condicional/pergunta-condicional';
import { Component, ViewChild } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { FieldConfig } from "./field-config";
import { TipoOperacaoCondicional } from './models/enumeradores/tipo-operacao-condicional.enum';
import { TipoPergunta } from './models/enumeradores/tipo-pergunta.enum';
import { RespostaModeloFormulario } from './models/resposta-modelo-formulario';
import { PerguntaTexto } from './models/perguntas/pergunta-texto';
import { ModeloFormulario } from './models/modelo-formulario';
import { RespostaTexto } from './models/respostas/resposta-texto';
import { LeiautePergunta } from './models/leiaute-pergunta';
import { Opcao } from './models/perguntas/opcao';
import { RespostaMultiplaOpcao } from './models/respostas/resposta-multipla-opcao';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  
  constructor(fb: FormBuilder) {

    //this.respostaFormulario = new RespostaModeloFormulario();
    this.respostaFormulario.modeloFormulario = new ModeloFormulario();

    let pTexto = new PerguntaTexto();
    pTexto.descricao = "Nome";
    pTexto.titulo="nome";
    pTexto.perguntaID = 1;

    pTexto.leiautesPergunta.push(new LeiautePergunta());
    
    let pTexto2 = new PerguntaTexto();
    pTexto2.descricao = "Condicional";
    pTexto2.titulo="Condicional";
    pTexto2.perguntaID = 2;
    let pCondicional2 = new PerguntaCondicionalTexto();
    pCondicional2.perguntaID = 1;
    pCondicional2.perguntaCondicionalID = 1;
    pCondicional2.operacaoCondicional = TipoOperacaoCondicional.Texto_Igual;
    pCondicional2.tipoPergunta = TipoPergunta.Texto;
    pCondicional2.valorAtivacao = "Ativa";
    pTexto2.perguntaCondicional = pCondicional2;

    let pMultipla1 = new PerguntaMultiplaEscolha();
    pMultipla1.perguntaID = 3;
    pMultipla1.descricao="Multipla";
    pMultipla1.titulo="Multipla";

    let opcao1 = new Opcao();
    opcao1.opcaoID=20;
    opcao1.descricao="Op1";

    let opcao2 = new Opcao();
    opcao2.opcaoID=21;
    opcao2.descricao="Op2";

    pMultipla1.opcoes.push(opcao1);
    pMultipla1.opcoes.push(opcao2);

    this.respostaFormulario.modeloFormulario.perguntas.push(pTexto);
    this.respostaFormulario.modeloFormulario.perguntas.push(pTexto2);
    //this.respostaFormulario.modeloFormulario.perguntas.push(pMultipla1);

    let r1 = new RespostaTexto(this.respostaFormulario, 1, 1);
    r1.valor = "Meu Valor";
    this.respostaFormulario.respostas.push(r1);

    let r2 = new RespostaTexto(this.respostaFormulario, 2, 2);
    r2.valor = "Outro valor";
    this.respostaFormulario.respostas.push(r2);

    // let r3 = new RespostaMultiplaOpcao(this.respostaFormulario,3,3);
    // r3.opcoes.push(21);
    // this.respostaFormulario.respostas.push(r3);

    r1.getSubjectVisible().subscribe(x => {
      console.log("R1 : ", x);
    });

    r2.getSubjectVisible().subscribe(x => {
      console.log("R2 : ", x);
    });

    //return;
    // r1.setValor("Inativa");    
    // r2.setValor("Outro valor");

     setTimeout(() => {
        // r1.setValor("Ativa");  
      // r2.setValor("Outro valor2");
     }, 5000);

    let control = fb.control({ value: 'teste' });
    
    return;

    this.regConfig.push(
      {
        subjectVisible: r1.getSubjectVisible(),
        valueChanges: (x) => {r1.setValor(x); console.log('r1'); },
        visible: r1.getVisible(),
        type: "input",
        label: "Nome",
        inputType: "text",
        name: "Nome",
        value: "",
        validations: []
      });

    this.regConfig.push(
      {
        subjectVisible: r2.getSubjectVisible(),
        valueChanges: (x) => {r2.setValor(x); console.log('r2'); },
        visible: r2.getVisible(),
        type: "input",
        label: "Condicional",
        inputType: "text",
        name: "Condicional",
        validations: []
      });

    // this.regConfig.push(
    // {
    //   type: "button",
    //   label: "Save"
    // });
  }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [];
  respostaFormulario: RespostaModeloFormulario = new RespostaModeloFormulario();

  //   {
  //     name: "required",
  //     validator: Validators.required,
  //     message: "Name Required"
  //   },
  //   {
  //     name: "pattern",
  //     validator: Validators.pattern("^[a-zA-Z]+$"),
  //     message: "Accept only text"
  //   }
  //]
  //},
  // ,
  // {
  //   type: "input",
  //   label: "Email Address",
  //   inputType: "email",
  //   name: "email",
  //   validations: [
  //     {
  //       name: "required",
  //       validator: Validators.required,
  //       message: "Email Required"
  //     },
  //     {
  //       name: "pattern",
  //       validator: Validators.pattern(
  //         "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
  //       ),
  //       message: "Invalid email"
  //     }
  //   ]
  // },
  // {
  //   type: "input",
  //   label: "Password",
  //   inputType: "password",
  //   name: "password",
  //   validations: [
  //     {
  //       name: "required",
  //       validator: Validators.required,
  //       message: "Password Required"
  //     }
  //   ]
  // },
  // {
  //   type: "radiobutton",
  //   label: "Gender",
  //   name: "gender",
  //   options: ["Male", "Female"],
  //   value: "Male"
  // },
  // {
  //   type: "date",
  //   label: "DOB",
  //   name: "dob",
  //   validations: [
  //     {
  //       name: "required",
  //       validator: Validators.required,
  //       message: "Date of Birth Required"
  //     }
  //   ]
  // },
  // {
  //   type: "select",
  //   label: "Country",
  //   name: "country",
  //   value: "UK",
  //   options: ["India", "UAE", "UK", "US"]
  // },
  // {
  //   type: "checkbox",
  //   label: "Accept Terms",
  //   name: "term",
  //   value: true
  // },

  //];

  submit(value: any) { }
}
