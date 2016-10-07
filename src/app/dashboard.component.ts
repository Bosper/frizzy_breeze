import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard',
    template : require('./dashboard.component.html')
})
export class DashboardComponent implements OnInit {
    date: Date;
    isLogged: boolean;

    constructor() {
        this.date = new Date();
        this.isLogged = false;
    }
    
    ngOnInit() {
    }

}