import { PerguntaComOpcoes } from './pergunta-com-opcoes';
import { TipoPergunta } from '../enumeradores/tipo-pergunta.enum';

export class PerguntaMultiplaEscolha extends PerguntaComOpcoes {
    /**
     *
     */
    constructor() {
        super();        
        this.tipoPergunta = TipoPergunta.MultiplaEscolha;
    }

}
