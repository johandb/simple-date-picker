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

    constructor(private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.model.currentDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
        // this.model.currentDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
        console.log('model:', this.model);
    }

    onSubmit() {
        console.log('onSubmit:', this.model);
    }
}
