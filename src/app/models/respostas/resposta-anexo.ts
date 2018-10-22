import { Resposta } from "./resposta";
import { RespostaModeloFormulario } from "../resposta-modelo-formulario";
import { Subject } from "rxjs";

export class RespostaAnexo extends Resposta {
    anexoID:number;  
    valor:File;  
    /**
     *
     */
    constructor(respostaModeloFormulario: RespostaModeloFormulario, perguntaID: number, respostaID: number) {
        super(respostaModeloFormulario, perguntaID, respostaID);
        this.valor = new File([],"");
    }

    setValor(val: File) {
        this.valor = val;
        this.getSubject().next(val);
    }

    protected createSubject() {
        this.setSubject(new Subject<File>());
    }
}
