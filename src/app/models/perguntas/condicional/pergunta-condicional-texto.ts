import { TipoOperacaoCondicional } from './../../enumeradores/tipo-operacao-condicional.enum';
import { PerguntaCondicional } from './pergunta-condicional';

export class PerguntaCondicionalTexto extends PerguntaCondicional {
    valorAtivacao: string;

    VerificarAtivacaoCondicional(obj: string): boolean {
        let condicao = false as boolean;
        switch (this.operacaoCondicional) {
            case TipoOperacaoCondicional.Texto_Contem:
                condicao = obj !== null && obj.indexOf(this.valorAtivacao) !== -1;
                break;
            case TipoOperacaoCondicional.Texto_Diferente:
                condicao = obj !== this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Texto_Igual:
                condicao = obj === this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.Texto_NaoContem:
                condicao = obj !== null && obj.indexOf(this.valorAtivacao) === -1;
                break;
        }

        return condicao;
    }
}
