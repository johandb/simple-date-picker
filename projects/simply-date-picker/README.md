SimplyDatePicker
================

A small library that adds a simple date picker to your forms

## Installation

  `npm install simply-date-picker`

## Dependencies
 ```html

```

## Usage
```html

<div class="container">
    <h1>Date Picker Demo</h1>
    <div class="row">
        <div class="col-md-4">
            <form [formGroup]="myForm" autocomplete="off">
                <div class="form-group">
                    <label for="currentDate">Datum</label>
                    <input (click)="dp.toggle()" formControlName="currentDate" placeholder="dd-mm-yyyy" value="currentDate" class="form-control">
                    <simple-date-picker #dp (dateChange)="onDatePickerChange($event)" [date]="currentDate"></simple-date-picker>
                </div>
            </form>
            <button (click)="onSubmit()" class="btn btn-primary">Ok</button>
        </div>
        <div class="col-md-8"></div>
    </div>
</div>

date formats supported are : dd-MM-yyyy and yyyy-MM-dd

```

Import the SimpleDatePickerModule in your app.module.ts

```javascript
import { SimpleDatePickerModule } from 'dynaform';

imports: [
    SimpleDatePickerModule,
];

```

```javascript

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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
    date: string;
    currentDate: string;

    constructor(private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.model.currentDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    }

    onSubmit() {
        console.log('onSubmit:', this.model);
    }
}

```

Create the html template for this component, see below (bootstrap is used)

```html

<div class="container">
    <h1>Date Picker Demo</h1>
    <div class="row">
        <div class="col-md-4">
            <form name="form" (ngSubmit)="f.form.valid && onSubmit()" #f="ngForm" novalidate autocomplete="off">
                <div class="form-group">
                    <label for="currentDate">Datum</label>
                    <input (click)="dp.toggle()" placeholder="dd-mm-yyyy" name="currentDate" [(ngModel)]="model.currentDate" class="form-control" #currentDate="ngModel">
                    <simple-date-picker #dp [(date)]="model.currentDate"></simple-date-picker>
                </div>
                <button class="btn btn-primary">Ok</button>
            </form>
            date now : {{model.currentDate}}
        </div>
        <div class="col-md-8"></div>
    </div>
</div>

```



