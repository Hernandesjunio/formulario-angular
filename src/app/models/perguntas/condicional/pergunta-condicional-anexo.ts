import { PerguntaCondicional } from "./pergunta-condicional";
import { TipoOperacaoCondicional } from "../../enumeradores/tipo-operacao-condicional.enum";

export class PerguntaCondicionalAnexo extends PerguntaCondicional {
    valorAtivacao: number;

    VerificarAtivacaoCondicional(obj: number): boolean {
        let condicao = false as boolean;
        switch (this.operacaoCondicional) {
            case TipoOperacaoCondicional.Anexo_Maior:
                condicao = obj > this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Anexo_Menor:
                condicao = obj < this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Anexo_MaiorIgual:
                condicao = obj >= this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Anexo_MenorIgual:
                condicao = obj <= this.valorAtivacao;
                break;
        }

        return condicao;
    }
}
