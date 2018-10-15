import { TipoOperacaoCondicional } from '../../enumeradores/tipo-operacao-condicional.enum';
import { TipoPergunta } from '../../enumeradores/tipo-pergunta.enum';
import { error } from '@angular/compiler/src/util';

export abstract class PerguntaCondicional {
    perguntaCondicionalID: number;
    tipoPergunta: TipoPergunta;
    perguntaID: number;
    operacaoCondicional: TipoOperacaoCondicional;

    VerificarAtivacaoCondicional(obj:any): boolean {
        throw error('Não implementado');
    }
}
