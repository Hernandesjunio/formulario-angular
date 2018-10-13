import { Resposta } from './resposta';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';
import { Subject } from 'rxjs';
import { RespostaLinhaPerguntaGrade } from './resposta-linha-pergunta-grade';

export class RespostaGradeOpcoes extends Resposta {
    respostaGrade:RespostaLinhaPerguntaGrade[];

    constructor(respostaModeloFormulario:RespostaModeloFormulario, perguntaID:number, respostaID:number, respostaGrade:RespostaLinhaPerguntaGrade[]){
        super(respostaModeloFormulario, perguntaID, respostaID);
        this.respostaGrade = respostaGrade;
    }

    protected createSubject(){
        this.subject = new Subject<RespostaLinhaPerguntaGrade>();
    }

    setRespostaGrade(resposta:RespostaLinhaPerguntaGrade){
        let r = this.respostaGrade.find(x=>x.linhaPerguntaGradeID == resposta.linhaPerguntaGradeID);
        r.opcaoRespondidaID = resposta.opcaoRespondidaID;
        this.subject.next(resposta);
    }
}