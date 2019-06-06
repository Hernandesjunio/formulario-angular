import { PerguntaAnexo } from './../../models/perguntas/pergunta-anexo';
import { FileUploadComponent } from './../file-upload/file-upload.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { TipoPergunta } from 'src/app/models/enumeradores/tipo-pergunta.enum';
import { RespostaTexto } from 'src/app/models/respostas/resposta-texto';
import { RespostaUnicaOpcao } from 'src/app/models/respostas/resposta-unica-opcao';
import { RespostaData } from 'src/app/models/respostas/resposta-data';
import { RespostaGradeOpcoes } from 'src/app/models/respostas/resposta-grade-opcoes';
import { RespostaNumero } from 'src/app/models/respostas/resposta-numero';
import { RespostaMultiplaOpcao } from 'src/app/models/respostas/resposta-multipla-opcao';
import { PerguntaMultiplaEscolha } from 'src/app/models/perguntas/pergunta-multipla-escolha';
import { RespostaAnexo } from 'src/app/models/respostas/resposta-anexo';
import { BaseComponent } from '../base/base.component';
import { Resposta } from 'src/app/models/respostas/resposta';
import { Subscription } from 'rxjs';

export class FormControlCreator {
    /**
     *
     */
    constructor(private fb: FormBuilder, private components: BaseComponent[]) {

    }

    public bindValidations(validations: any[]) {
        if ((validations || []).length > 0) {
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }

    createControl(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        let control: { control: AbstractControl, subscriptions: Subscription[] } = null;

        switch (resposta.getPergunta().getTipoPergunta()) {
            case TipoPergunta.Texto:
                control = this.createControlRespostaTexto(resposta);
                break;
            case TipoPergunta.EscolhaUnica:
                control = this.createControlRespostaUnicaOpcao(resposta);
                break;
            case TipoPergunta.MultiplaEscolha:
                control = this.createControlRespostaMultiplaEscolha(resposta);
                break;
            case TipoPergunta.Numero:
                control = this.createControlRespostaNumero(resposta);
                break;
            case TipoPergunta.Data:
                control = this.createControlRespostaData(resposta);
                break;
            case TipoPergunta.Grade:
                control = this.createControlRespostaGrade(resposta);
                break;
            case TipoPergunta.Anexo:
                control = this.createControlRespostaAnexo(resposta);
                break;
            default:
                throw new Error(resposta.getPergunta().getTipoPergunta().toString() + " Não implementado");
        }

        return control;
    }

    private createControlRespostaTexto(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        const subscriptions: Subscription[] = [];
        const rTexto = resposta as RespostaTexto;
        const control = this.fb.control(rTexto.valor, this.bindValidations(resposta.getValidations()));
        const sub = control.valueChanges.debounceTime(500).subscribe(x => { rTexto.setValor(x); });
        subscriptions.push(sub);

        return { control: control, subscriptions: subscriptions };
    }

    private createControlRespostaUnicaOpcao(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        const subscriptions: Subscription[] = [];
        const rEscolhaUnica = resposta as RespostaUnicaOpcao;
        const control = this.fb.control(rEscolhaUnica.opcaoID, this.bindValidations(resposta.getValidations() || []));
        const sub = control.valueChanges.debounceTime(500).subscribe(x => { rEscolhaUnica.setOpcaoID(x); });
        subscriptions.push(sub);

        return { control: control, subscriptions: subscriptions };
    }

    private createControlRespostaMultiplaEscolha(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        const subscriptions: Subscription[] = [];
        const rMultiplaEscolha = resposta as RespostaMultiplaOpcao;
        const pMultipla = rMultiplaEscolha.getPergunta() as PerguntaMultiplaEscolha;

        const controls = pMultipla.opcoes.map((x) => {
            let selected = false;
            if (rMultiplaEscolha.opcoes.findIndex(d => d === x.opcaoID) > -1) {
                selected = true;
            }
            return this.fb.control(selected);
        });

        const control = this.fb.array(controls, this.bindValidations(resposta.getValidations() || []));
        const sub = control.valueChanges.debounceTime(500).subscribe(x => {
            rMultiplaEscolha.setOpcoes(x)
        });

        subscriptions.push(sub);
        return { control: control, subscriptions: subscriptions };
    }

    private createControlRespostaNumero(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        const subscriptions: Subscription[] = [];
        const rNumero = resposta as RespostaNumero;
        const control = this.fb.control(rNumero.valor, this.bindValidations(resposta.getValidations() || []));
        const sub = control.valueChanges.debounceTime(500).subscribe(x => { rNumero.setValor(x); });
        subscriptions.push(sub);

        return { control: control, subscriptions: subscriptions };
    }

    private createControlRespostaData(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        const subscriptions: Subscription[] = [];
        const rData = resposta as RespostaData;
        const control = this.fb.control(rData.valor, this.bindValidations(resposta.getValidations() || []));
        const sub = control.valueChanges.debounceTime(500).subscribe(x => { rData.setValor(x); });
        subscriptions.push(sub);

        return { control: control, subscriptions: subscriptions };
    }

    private createControlRespostaGrade(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        const rGrade = resposta as RespostaGradeOpcoes;
        const subscriptions: Subscription[] = [];
        const controls = rGrade.respostaLinhaPerguntaGrade.map(linha => {
            const linhaControl = this.fb.control(linha.opcaoRespondidaID, this.bindValidations(resposta.getValidations() || []));
            const sub = linhaControl.valueChanges.debounceTime(500).subscribe(x => { rGrade.setRespostaGrade(linha); });
            subscriptions.push(sub);
            return linhaControl;
        });

        const control = this.fb.array(controls);

        return { control: control, subscriptions: subscriptions };
    }

    private createControlRespostaAnexo(resposta: Resposta): { control: AbstractControl, subscriptions: Subscription[] } {
        const subscriptions: Subscription[] = [];
        const rAnexo = resposta as RespostaAnexo;
        const control = this.fb.control(rAnexo.valor.name, this.bindValidations(resposta.getValidations() || []));
        const sub = control.valueChanges.debounceTime(20)
            .subscribe(() => {
                const component = this.components.find(x => x.resposta.getPergunta().perguntaID === rAnexo.perguntaID) as FileUploadComponent;
                if (component.file.nativeElement.files.length > 0) {
                    const file = component.file.nativeElement.files[0] as File;
                    const pergunta = rAnexo.getPergunta() as PerguntaAnexo;
                    rAnexo.setValor(file);
                    component.group.get(rAnexo.getComponentName()).updateValueAndValidity({ onlySelf: false, emitEvent: false });
                    if (file.size < pergunta.tamanhoMaximoBytes) {
                        component.onFilesAdded();
                    }                    
                }
            });

        subscriptions.push(sub);

        return { control: control, subscriptions: subscriptions };
    }
}