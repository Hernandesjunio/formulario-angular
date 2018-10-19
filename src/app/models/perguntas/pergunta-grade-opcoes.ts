import { PerguntaComOpcoes } from './pergunta-com-opcoes';
import { LinhaGrade } from './linha-grade';
import { TipoPergunta } from '../enumeradores/tipo-pergunta.enum';

export class PerguntaGradeOpcoes extends PerguntaComOpcoes {
    linhasGrade: LinhaGrade[]=[];

    /**
     *
     */
    constructor() {
        super();
        this.tipoPergunta = TipoPergunta.Grade;
    }
}
