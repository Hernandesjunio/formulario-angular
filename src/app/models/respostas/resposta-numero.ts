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
        this.subject.next(val);
    }
    protected createSubject(){
        this.subject = new Subject<number>();  
    }
}

