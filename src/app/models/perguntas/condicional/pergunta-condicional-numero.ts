import { PerguntaCondicional } from './pergunta-condicional';
import { TipoOperacaoCondicional } from '../../enumeradores/tipo-operacao-condicional.enum';

export class PerguntaCondicionalNumero extends PerguntaCondicional {
    valorAtivacao: number;

    VerificarAtivacaoCondicional(obj: any): boolean {
        let condicao = false as boolean;
        switch (this.operacaoCondicional) {
            case TipoOperacaoCondicional.Numero_Maior:
                condicao = obj > this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Numero_Menor:
                condicao = obj < this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Numero_MaiorIgual:
                condicao = obj >= this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Numero_MenorIgual:
                condicao = obj <= this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Numero_Diferente:
                condicao = obj !== this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Numero_Igual:
                condicao = obj === this.valorAtivacao;
                break;
        }

        return condicao;
    }
}
