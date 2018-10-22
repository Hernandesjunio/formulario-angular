import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { DateComponent } from './components/date/date.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BaseComponent } from './components/base/base.component';
import { MultipleLineRadiobuttonComponent } from './components/multiple-line-radiobutton/multiple-line-radiobutton.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    FileUploadComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    MultipleLineRadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    MultipleLineRadiobuttonComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule, 
    //MatProgressBarModule,
    //MatDialogModule,
    BrowserModule,
    //BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BaseComponent,
    FileUploadComponent,
    InputComponent,
    MultipleLineRadiobuttonComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent
  ]
})
export class AppModule {}
