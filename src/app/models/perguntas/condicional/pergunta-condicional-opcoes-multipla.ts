import { PerguntaCondicionalOpcoes } from './pergunta-condicional-opcoes';
import { TipoOperacaoCondicional } from '../../enumeradores/tipo-operacao-condicional.enum';

export class PerguntaCondicionalOpcoesMultipla extends PerguntaCondicionalOpcoes {

    VerificarAtivacaoCondicional(obj: number[]): boolean {
        let condicao = false as boolean;
        switch (this.operacaoCondicional) {
            case TipoOperacaoCondicional.MultiplaOpcoes_Contem:
                // o resultado retornado é igual à opções de ativacao
                condicao = obj.filter(x => this.opcoesAtivacao.indexOf(x) > -1).length === this.opcoesAtivacao.length;
                break;
            case TipoOperacaoCondicional.MultiplaOpcoes_Diferente:
                // possui algum elemento diferente
                condicao = obj.filter(x => this.opcoesAtivacao.indexOf(x) > -1).length !== obj.length;
                break;
            case TipoOperacaoCondicional.MultiplaOpcoes_Igual:
                // encontrou todos elementos de obj
                condicao = obj.filter(x => this.opcoesAtivacao.indexOf(x) > -1).length === obj.length;
                break;
            case TipoOperacaoCondicional.MultiplaOpcoes_NaoContem:
                // todos elementos não podem ser localizados em opçoes ativação
                condicao = obj.filter(x => this.opcoesAtivacao.indexOf(x) === -1).length === obj.length;
                break;
        }

        return condicao;
    }
}
