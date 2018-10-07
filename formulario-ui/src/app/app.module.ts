import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModeloFormularioComponent } from './modelo-formulario/modelo-formulario.component';
import { RespostaModeloFormularioComponent } from './resposta-modelo-formulario/resposta-modelo-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    ModeloFormularioComponent,
    RespostaModeloFormularioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
