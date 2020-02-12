import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { SimpleDatePickerComponent } from 'projects/simply-date-picker/src/components/simple-date-picker.component';

@NgModule({
    declarations: [
        AppComponent,
        SimpleDatePickerComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
