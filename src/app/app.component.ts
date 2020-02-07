import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        DatePipe
    ]
})
export class AppComponent implements OnInit {

    model: any = {};
    myForm: FormGroup;
    currentDate: string;

    constructor(private datePipe: DatePipe, private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.myForm = this.formBuilder.group({
            currentDate: ['']
        });
    }

    onDatePickerChange(dateValue: string): void {
        console.log('onDatePickerChange:', dateValue);
        this.myForm.get('currentDate').setValue(dateValue);
    }

    onSubmit() {
        console.log('onSubmit:', this.myForm.value);
    }
}
