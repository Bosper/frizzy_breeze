import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login.component'

@Component({
    selector: 'dashboard',
    template : require('./dashboard.component.html'),
    providers: [LoginComponent]
})
export class DashboardComponent implements OnInit {
    date: Date;
    isLogged: boolean = false;

    constructor() {
        this.date = new Date();
        this.isLogged = false;
    }

    changeView(logged: any) {
        console.log("LOGGED: ", logged);
        this.isLogged = logged;
    }
    
    ngOnInit() {
        //this.isLogged = this.loginComponent.logged;
    }

}