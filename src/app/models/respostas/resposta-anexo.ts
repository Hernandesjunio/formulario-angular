import { PerguntaAnexo } from './../perguntas/pergunta-anexo';
import { Validator } from './../../validator';
import { Resposta } from "./resposta";
import { RespostaModeloFormulario } from "../resposta-modelo-formulario";
import { Subject } from "rxjs";
import { ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

export class RespostaAnexo extends Resposta {
    anexoID: number;
    valor: File;
    /**
     *
     */
    constructor(respostaModeloFormulario: RespostaModeloFormulario, perguntaID: number, respostaID: number) {
        super(respostaModeloFormulario, perguntaID, respostaID);
        this.valor = new File([], "");
    }

    getValor():File{
        return this.valor;
    }

    setValor(val: File) {
        this.valor = val;
        this.getSubject().next(val);
    }

    private validateMaxSizeFileInput(respostaAnexo: RespostaAnexo): ValidatorFn {
        const maxBytes = (respostaAnexo.getPergunta() as PerguntaAnexo).tamanhoMaximoBytes;        
        return (control: AbstractControl): { [key: string]: any } | null => {
            const isValid = this.valor.size <= maxBytes;
            return isValid ? null : { 'TamanhoExcedido': { value: control.value } };
        }
    }

    getValidations(): Validator[] {
        return super.getValidations()
            .concat(
                {
                    name: 'maxSize',
                    message: 'Tamanho máximo excedido',
                    validator: this.validateMaxSizeFileInput(this)
                });
    }

    protected createSubject() {
        this.setSubject(new Subject<File>());
    }
}


