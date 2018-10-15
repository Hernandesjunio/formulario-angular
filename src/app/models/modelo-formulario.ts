import { Pergunta } from "./perguntas/pergunta";


export class ModeloFormulario{
    titulo:string;
    perguntas: Pergunta[];
    lstOperacaoCondicional:any[];

    constructor(){
        this.perguntas = new Array<Pergunta>();
    }
}