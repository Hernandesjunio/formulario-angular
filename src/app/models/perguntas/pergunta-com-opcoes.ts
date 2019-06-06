import { Pergunta } from './pergunta';
import { Opcao } from './opcao';

export class PerguntaComOpcoes extends Pergunta {
    /**
     *
     */
    constructor() {
        super();        
    }
    opcoes: Opcao[]=[];
}
