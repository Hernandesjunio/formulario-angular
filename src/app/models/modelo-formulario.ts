import { Pergunta } from "./perguntas/pergunta";


export class ModeloFormulario{
    perguntas: Pergunta[];
    lstOperacaoCondicional:any[];

    constructor(){
        this.perguntas = new Array<Pergunta>();
    }
}