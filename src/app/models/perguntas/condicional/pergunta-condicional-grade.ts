import { Opcao } from 'src/app/models/perguntas/opcao';
import { PerguntaCondicionalOpcoes } from './pergunta-condicional-opcoes';

export class PerguntaCondicionalGrade extends PerguntaCondicionalOpcoes {
    perguntaGrade: Opcao[];

    VerificarAtivacaoCondicional(obj: any): boolean {
        return false;
    }
}
