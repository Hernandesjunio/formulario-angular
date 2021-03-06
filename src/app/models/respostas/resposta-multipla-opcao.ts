import { Subject } from 'rxjs';
import { Resposta } from './resposta';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';

export class RespostaMultiplaOpcao extends Resposta {
    opcoes: number[];

    constructor(respostaModeloFormulario: RespostaModeloFormulario, perguntaID: number, respostaID: number) {
        super(respostaModeloFormulario, perguntaID, respostaID);
        this.opcoes = [];
    }

    setOpcoes(op: number[]) {
        this.opcoes = op;
        this.getSubject().next(op);
    }

    protected createSubject() {
        this.setSubject(new Subject<number[]>());
    }
}
