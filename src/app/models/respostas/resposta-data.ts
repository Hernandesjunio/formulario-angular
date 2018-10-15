import { Resposta } from './resposta';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';
import { Subject } from 'rxjs';

export class RespostaData extends Resposta{
    valor:Date;

    constructor(respostaModeloFormulario:RespostaModeloFormulario, perguntaID:number, respostaID:number){
        super(respostaModeloFormulario, perguntaID, respostaID);
    }

    setValor(val:Date){
        this.valor = val;
        this.getSubject().next(val);
    }

    protected createSubject(){
        this.setSubject(new Subject<number>());
    }
}

