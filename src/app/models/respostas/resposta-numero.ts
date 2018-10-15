import { Subject } from 'rxjs';
import { Resposta } from './resposta';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';

export class RespostaNumero extends Resposta{
    valor:number;

    constructor(respostaModeloFormulario:RespostaModeloFormulario, perguntaID:number, respostaID:number){
        super(respostaModeloFormulario, perguntaID, respostaID);                                     
    }

    setValor(val:number){
        this.valor = val;
        this.getSubject().next(val);
    }
    protected createSubject(){
        this.setSubject(new Subject<number>());
    }
}

