import { PerguntaCondicional } from './pergunta-condicional';
import { TipoOperacaoCondicional } from '../../enumeradores/tipo-operacao-condicional.enum';

export class PerguntaCondicionalUnica extends PerguntaCondicional {
    valorAtivacao: number;

    VerificarAtivacaoCondicional(obj: any): boolean {
        let condicao = false as boolean;
        switch (this.operacaoCondicional) {
            case TipoOperacaoCondicional.UnicaOpcao_Diferente:
                condicao = obj !== this.valorAtivacao;
                break;
            case TipoOperacaoCondicional.UnicaOpcao_Igual:
                condicao = obj === this.valorAtivacao;
                break;
        }

        return condicao;
    }
}
