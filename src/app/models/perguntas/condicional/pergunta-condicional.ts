import { TipoOperacaoCondicional } from '../../enumeradores/tipo-operacao-condicional.enum';
import { TipoPergunta } from '../../enumeradores/tipo-pergunta.enum';
import { Opcao } from "../../../opcao";
import { error } from '@angular/compiler/src/util';

export class PerguntaCondicional{
    perguntaCondicionalID:number;
    tipoPergunta:TipoPergunta;
    perguntaID:number;
    operacaoCondicional:TipoOperacaoCondicional;   

    VerificarAtivacaoCondicional(obj:any):boolean{
        throw error("Não implementado");
    }
}

export class PerguntaCondicionalTexto extends PerguntaCondicional{
    valorAtivacao:string;
 
    VerificarAtivacaoCondicional(obj:string):boolean{
        let condicao = false as boolean;
        switch (this.operacaoCondicional){
            case TipoOperacaoCondicional.Texto_Contem:
            condicao = obj !== null && obj.indexOf(this.valorAtivacao) !== -1;
            break;
            case TipoOperacaoCondicional.Texto_Diferente:
            condicao = obj != this.valorAtivacao;
            break;
            case TipoOperacaoCondicional.Texto_Igual:
            condicao = obj == this.valorAtivacao;
            break;
            case TipoOperacaoCondicional.Texto_NaoContem:
            condicao =  obj !== null && obj.indexOf(this.valorAtivacao) === -1;
            break;
        }

        return condicao;
    }
}

export class PerguntaCondicionalData  extends PerguntaCondicional{
    valorAtivacao:Date;

    VerificarAtivacaoCondicional(obj:any):boolean{
        return false;
    }
}

export class PerguntaCondicionalNumero  extends PerguntaCondicional{
    valorAtivacao:number;
}

export class PerguntaCondicionalOpcoes  extends PerguntaCondicional{
    opcoesAtivacao:number[];

    VerificarAtivacaoCondicional(obj:any):boolean{
        return false;
    }    
}

export class PerguntaCondicionalGrade  extends PerguntaCondicionalOpcoes{
    perguntaGrade:Opcao[];

    VerificarAtivacaoCondicional(obj:any):boolean{
        return false;
    }
}

export class PerguntaCondicionalOpcoesMultipla  extends PerguntaCondicionalOpcoes{

    VerificarAtivacaoCondicional(obj:any):boolean{
        return false;
    }
}

export class PerguntaCondicionalUnica  extends PerguntaCondicional{
    valorAtivacao:number;

    VerificarAtivacaoCondicional(obj:any):boolean{
        return false;
    }
}
