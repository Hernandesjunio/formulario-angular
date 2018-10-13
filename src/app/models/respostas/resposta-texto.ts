import { Subject } from 'rxjs';
import { Resposta } from './resposta';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';

export class RespostaTexto extends Resposta{    
    valor:string;    
    
    constructor(respostaModeloFormulario:RespostaModeloFormulario, perguntaID:number, respostaID:number){
        super(respostaModeloFormulario, perguntaID, respostaID);
    }

    protected createSubject(){
        this.subject = new Subject<string>();  
    }

    setValor(val:string):void{
        this.valor = val;
        this.subject.next(val);        
    }
}

