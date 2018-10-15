import { Resposta } from './resposta';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';
import { Subject } from 'rxjs';
import { RespostaLinhaPerguntaGrade } from './resposta-linha-pergunta-grade';

export class RespostaGradeOpcoes extends Resposta {
    respostaGrade: RespostaLinhaPerguntaGrade[];

    constructor(rf: RespostaModeloFormulario, pID: number, rID: number, rg: RespostaLinhaPerguntaGrade[]) {
        super(rf, pID, rID);
        this.respostaGrade = rg;
    }

    protected createSubject() {
        this.setSubject(new Subject<RespostaLinhaPerguntaGrade>());
    }

    setRespostaGrade(resposta: RespostaLinhaPerguntaGrade) {
        const r = this.respostaGrade.find(x => x.linhaPerguntaGradeID === resposta.linhaPerguntaGradeID);
        r.opcaoRespondidaID = resposta.opcaoRespondidaID;
        this.getSubject().next(resposta);
    }
}
