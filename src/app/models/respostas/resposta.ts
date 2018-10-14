import { Subject } from 'rxjs';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';
import { Pergunta } from '../perguntas/pergunta';
import { Validator } from 'src/app/validator';
import { PerguntaUnicaEscolha } from '../perguntas/pergunta-unica-escolha';
import { PerguntaComOpcoes } from '../perguntas/pergunta-com-opcoes';

export class Resposta{
    protected subject:Subject<any>;
    protected subjectVisible:Subject<boolean>;
    protected respostaModeloFormulario:RespostaModeloFormulario;
    pergunta:Pergunta;    
    respostaID:number;
    perguntaID:number;
    protected visivel:boolean;
    
    constructor(respostaModeloFormulario:RespostaModeloFormulario, perguntaID:number, respostaID:number){
        this.perguntaID = perguntaID;
        this.respostaID = respostaID;
        this.respostaModeloFormulario = respostaModeloFormulario;
        let pergunta = respostaModeloFormulario.modeloFormulario.perguntas.find(d=>d.perguntaID == this.perguntaID);
        this.pergunta = pergunta;
        this.subjectVisible = new Subject<boolean>();
        this.createSubject();
        this.validarCondicional();
    }    

    validarCondicional():void{
        if(this.pergunta.perguntaCondicional != null){
            let perguntaCondicional = this.respostaModeloFormulario.modeloFormulario.perguntas.find(d=>d.perguntaID == this.pergunta.perguntaCondicional.perguntaID);
            let respostaCondicional = this.respostaModeloFormulario.respostas.find(x=>x.perguntaID == perguntaCondicional.perguntaID);

            if(respostaCondicional != null){
                respostaCondicional.getSubject().subscribe(x=>{
                    let v = this.pergunta.perguntaCondicional.VerificarAtivacaoCondicional(x);
                    this.setVisible(v);
                });                      
            }
        }  
        else{
            this.setVisible(true);
        }
    }

    getVisible():boolean{
        return this.visivel;
    }

    setVisible(b:boolean){
        this.visivel = b;
        this.subjectVisible.next(this.visivel);
    }

    protected createSubject(){
        throw new Error("Create Subject doesn't implement");
    }

    getSubjectVisible():Subject<boolean>{
        return this.subjectVisible;
    }

    getSubject():Subject<any>{
        return this.subject;
    }

    getComponentName():string{
        return `${this.perguntaID}_${this.pergunta.titulo}`;
    }

    getComponentPlaceHolder():string{     
           
        return `${this.pergunta.descricao}`;
    }

    getComponentType():string{
        return this.pergunta.getTipoControle();
    }

    getValidations():Validator[]{
        return [];
    }
}
