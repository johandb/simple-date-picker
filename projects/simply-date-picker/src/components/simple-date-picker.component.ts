import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'simple-date-picker',
    templateUrl: './simple-date-picker.component.html',
    styleUrls: ['./simple-date-picker.component.css'],
    providers: [
        DatePipe
    ]
})
export class SimpleDatePickerComponent implements OnInit {

    @Input() date: string;
    @Output() dateChange = new EventEmitter<string>();
    @Input() dateFormat: string

    originalDate: Date;

    showDatePicker = false;
    selectedDate: Date;

    dateValues = [];

    months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"];
    days = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    constructor(private datePipe: DatePipe) {
    }

    ngOnInit() {
        //console.log('date1:', this.date);
        if (this.date === undefined) {
            this.date = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
            this.dateFormat = "dd-MM-yyyy";
        }
        if (this.dateFormat === undefined) {
            this.dateFormat = "dd-MM-yyyy";
        }
        this.parseDate();
        //console.log('date2:', this.date, ', length:', this.date.length);
        this.build();
    }

    toggle() {
        this.showDatePicker = !this.showDatePicker;
    }

    getYears(): number[] {
        var years = [];
        for (var i = this.selectedDate.getFullYear() - 10; i < this.selectedDate.getFullYear() + 10; i++) {
            years.push(i);
        }
        return years;
    }

    isSelectedDate(d: any): string {
        if ((d.day == this.originalDate.getDate()) && (d.month - 1 == this.originalDate.getMonth()) && (d.year == this.originalDate.getFullYear())) {
            return "sdp-day-selected"
        }
        if (d.month - 1 != this.selectedDate.getMonth()) {
            return "sdp-day-condensed"
        }
        return "sdp-day";
    }

    private parseDate() {
        if (this.dateFormat == undefined || this.dateFormat == "dd-MM-yyyy") {
            //console.log('DMY')
            var df1 = this.date.split("-", 3);
            var d1 = parseInt(df1[0]);
            var m1 = parseInt(df1[1]);
            var y1 = parseInt(df1[2]);
            this.selectedDate = new Date(y1, m1 - 1, d1);
            this.originalDate = new Date(this.selectedDate);
        } else if (this.dateFormat == "yyyy-MM-dd") {
            //console.log('YMD')
            var df2 = this.date.split("-", 3);
            var y2 = parseInt(df2[0]);
            var m2 = parseInt(df2[1]);
            var d2 = parseInt(df2[2]);
            this.selectedDate = new Date(y2, m2 - 1, d2);
            this.originalDate = new Date(this.selectedDate);
        }
    }

    private build() {
        this.dateValues = [];
        var d = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
        var m = d.getMonth();
        var y = d.getFullYear();
        var dow = d.getDay() == 0 ? 6 : (d.getDay() - 1);
        var row = [];
        if (y % 4 == 0) {
            this.daysInMonth[1] = 29;
        }
        var prevYear = y;
        var prevMonth = m - 1;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear = prevYear - 1
        }

        for (var k = 1; k <= dow; k++) {
            var r1 = {
                day: this.daysInMonth[prevMonth] - dow + k,
                month: prevMonth + 1,
                year: prevYear
            }
            row.push(r1);
        }

        for (var day = 0; day < this.daysInMonth[m]; day++) {
            var r2 = {
                day: (day + 1),
                month: m + 1,
                year: y
            }
            if ((day + dow + 1) % 7 == 0) {
                row.push(r2);
                this.dateValues.push({ record: row });
                row = [];
            } else {
                row.push(r2);
            }
        }

        var nextMonth = m + 1;
        var nextYear = y;
        if (m > 11) {
            nextYear = y + 1;
        }
        var last = row.length;
        for (var l = 0; l < 7 - last; l++) {
            var r3 = {
                day: l + 1,
                month: nextMonth + 1,
                year: nextYear
            }
            row.push(r3)
        }

        //console.log("row length:", row.length);
        this.dateValues.push({ record: row });
    }

    selectDate(d: any) {
        //console.log('you selected :', d);
        this.date = this.datePipe.transform(new Date(d.year, d.month - 1, d.day), this.dateFormat);
        this.parseDate();
        this.build();
        this.showDatePicker = false;
        this.dateChange.emit(this.date);
    }

    onDateChange(field: string, value: any) {
        //console.log(field, ', ', value);
        if (field === 'month') {
            this.selectedDate.setMonth(value);
        } else if (field === 'year') {
            this.selectedDate.setFullYear(value);
        }
        this.build();
        //console.log('selectedDate:', this.selectedDate);
        //console.log('originalDate:', this.originalDate);
    }
}
