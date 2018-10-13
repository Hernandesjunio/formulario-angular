import { TipoPergunta } from "../enumeradores/tipo-pergunta.enum";
import { PerguntaCondicional } from "./condicional/pergunta-condicional";
import { LeiautePergunta } from "../leiaute-pergunta";

export class Pergunta {
    deleted: boolean;
    perguntaID: number;
    titulo: string;
    descricao: string;
    tipoPergunta: TipoPergunta;
    obrigatorio: boolean;
    perguntaCondicional: PerguntaCondicional;
    perguntaCondicionalID: number;
    leiautesPergunta: LeiautePergunta[];
    tipoEntrada: number;
    validadorID: number;

    getTipoControle(): any {
        if (this.tipoPergunta == TipoPergunta.Texto)
            return "input";

        throw new Error('Não implementado');
        //   button: ButtonComponent,
        //   select: SelectComponent,
        //   date: DateComponent,
        //   radiobutton: RadiobuttonComponent,
        //   checkbox: CheckboxComponent

    }
}
