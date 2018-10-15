import { Pergunta } from './pergunta';
import { TipoPergunta } from '../enumeradores/tipo-pergunta.enum';


export class PerguntaTexto extends Pergunta {
    /**
     *
     */
    constructor() {
        super();
        this.tipoPergunta = TipoPergunta.Texto;
    }
    tamanhoMaximo: number;
    patternRegex: string;
}
