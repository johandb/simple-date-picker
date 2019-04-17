import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SimpleDatePickerComponent } from '../components/simple-date-picker.component';

@NgModule({
    declarations: [
        SimpleDatePickerComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        SimpleDatePickerComponent
    ]
})
export class SimpleDatePickerModule { }
