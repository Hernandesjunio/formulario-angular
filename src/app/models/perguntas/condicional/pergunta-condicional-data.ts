import { PerguntaCondicional } from './pergunta-condicional';
import { TipoOperacaoCondicional } from '../../enumeradores/tipo-operacao-condicional.enum';

export class PerguntaCondicionalData extends PerguntaCondicional {
    valorAtivacao: Date;

    VerificarAtivacaoCondicional(obj: Date): boolean {
        let condicao = false as boolean;
        switch (this.operacaoCondicional) {
            case TipoOperacaoCondicional.Data_Maior:
                condicao = obj > this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Data_Menor:
                condicao = obj < this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Data_MaiorIgual:
                condicao = obj >= this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Data_MenorIgual:
                condicao = obj <= this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Data_Diferente:
                condicao = obj !== this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Data_Igual:
                condicao = obj === this.valorAtivacao;
                break;
        }

        return condicao;
    }
}
