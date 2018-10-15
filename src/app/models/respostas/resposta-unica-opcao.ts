import { Subject } from 'rxjs';
import { Resposta } from './resposta';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';

export class RespostaUnicaOpcao extends Resposta {
    opcaoID?: number;

    constructor(respostaModeloFormulario: RespostaModeloFormulario, perguntaID: number, respostaID: number) {
        super(respostaModeloFormulario, perguntaID, respostaID);
    }

    setOpcaoID(opcao?: number) {
        this.opcaoID = opcao;
        this.getSubject().next(opcao);
    }

    protected createSubject() {
        this.setSubject(new Subject<number>());
    }
}
