import { Resposta } from './respostas/resposta';
import { ModeloFormulario } from './modelo-formulario';

export class RespostaModeloFormulario{
    modeloFormulario:ModeloFormulario;
    respostas: Resposta[];

    constructor(){
        this.respostas = new Array<Resposta>();
    }
}