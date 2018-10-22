import { RadiobuttonComponent } from './../../components/radiobutton/radiobutton.component';
import { TipoPergunta } from '../enumeradores/tipo-pergunta.enum';
import { PerguntaCondicional } from './condicional/pergunta-condicional';
import { LeiautePergunta } from '../leiaute-pergunta';

export class Pergunta {
    deleted: boolean;
    perguntaID: number;
    titulo: string;
    descricao: string;
    tipoPergunta: TipoPergunta;
    obrigatorio: boolean;
    perguntaCondicional: PerguntaCondicional;
    perguntaCondicionalID: number;
    leiautesPergunta: LeiautePergunta[] = [];
    tipoEntrada: number;
    validadorID: number;

    getTipoControle(): any {
        if (this.tipoPergunta === TipoPergunta.Texto) {
            return 'input';
        }

        if (this.tipoPergunta === TipoPergunta.MultiplaEscolha) {
            return 'checkbox';
        }

        if (this.tipoPergunta === TipoPergunta.EscolhaUnica) {
            return 'radiobutton';
        }

        if (this.tipoPergunta === TipoPergunta.Grade) {
            return 'multipleLineRadioButton';
        }

        if (this.tipoPergunta === TipoPergunta.Anexo) {
            return 'file';
        }

        throw new Error('Não implementado');
        //   button: ButtonComponent,
        //   select: SelectComponent,
        //   date: DateComponent,
        //   radiobutton: RadiobuttonComponent,
        //   checkbox: CheckboxComponent

    }
}
