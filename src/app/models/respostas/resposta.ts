import { Subject } from 'rxjs';
import { RespostaModeloFormulario } from '../resposta-modelo-formulario';
import { Pergunta } from '../perguntas/pergunta';
import { Validator } from 'src/app/validator';
import { PerguntaUnicaEscolha } from '../perguntas/pergunta-unica-escolha';
import { PerguntaComOpcoes } from '../perguntas/pergunta-com-opcoes';
import { Validators, ValidationErrors } from '@angular/forms';

export class Resposta {
    private subject: Subject<any>;
    private subjectVisible: Subject<boolean>;
    private respostaModeloFormulario: RespostaModeloFormulario;
    private pergunta: Pergunta;
    respostaID: number;
    perguntaID: number;
    private visivel: boolean;

    constructor(respostaModeloFormulario: RespostaModeloFormulario, perguntaID: number, respostaID: number) {
        this.perguntaID = perguntaID;
        this.respostaID = respostaID;
        this.respostaModeloFormulario = respostaModeloFormulario;
        this.pergunta = respostaModeloFormulario.modeloFormulario.perguntas.find(d => d.perguntaID === this.perguntaID);
        this.subjectVisible = new Subject<boolean>();
        this.createSubject();
        this.validarCondicional();
    }

    validarCondicional(): void {
        if (this.pergunta.perguntaCondicional != null) {
            const p = this.respostaModeloFormulario.modeloFormulario.perguntas;
            const perguntaCondicional = p.find(d => d.perguntaID === this.pergunta.perguntaCondicional.perguntaID);
            const respostaCondicional = this.respostaModeloFormulario.respostas.find(x => x.perguntaID === perguntaCondicional.perguntaID);

            if (respostaCondicional != null) {
                respostaCondicional.getSubject().subscribe(x => {
                    const v = this.pergunta.perguntaCondicional.VerificarAtivacaoCondicional(x);
                    this.setVisible(v);
                });
            }
        } else {
            this.setVisible(true);
        }
    }

    getPergunta(): Pergunta {
        return this.pergunta;
    }

    getVisible(): boolean {
        return this.visivel;
    }

    setVisible(b: boolean) {
        this.visivel = b;
        this.subjectVisible.next(this.visivel);
    }

    protected createSubject() {
        throw new Error('Create Subject doesnt implement');
    }

    getSubjectVisible(): Subject<boolean> {
        return this.subjectVisible;
    }

    protected setSubject(sub: Subject<any>) {
        this.subject = sub;
    }
    getSubject(): Subject<any> {
        return this.subject;
    }

    getComponentName(): string {
        return `${this.perguntaID}_${this.pergunta.titulo}`;
    }

    getComponentPlaceHolder(): string {

        return `${this.pergunta.descricao}`;
    }

    getComponentType(): string {
        return this.pergunta.getTipoControle();
    }

    getValidations(): Validator[] {

        const validations: Validator[] = [];

        if (this.pergunta.obrigatorio === true) {
            validations.push({ name: this.getComponentName(), message: 'Campo obrigatório', validator: Validators.required });
        }

        return validations;
    }
}
