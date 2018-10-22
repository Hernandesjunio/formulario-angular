import { Pergunta } from "./pergunta";
import { TipoPergunta } from "../enumeradores/tipo-pergunta.enum";

export class PerguntaAnexo extends Pergunta {
    /**
     *
     */
    constructor() {
        super();
        this.tipoPergunta = TipoPergunta.Anexo;
    }
    tamanhoMaximoBytes:number=5242880;
}
