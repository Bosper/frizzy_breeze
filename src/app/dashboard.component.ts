import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

import { LoginComponent } from './login.component';
import { Token } from './token.model';
import { AppService } from './app.service';


@Component({
    selector: 'dashboard',
    template : require('./dashboard.component.html')
})
export class DashboardComponent implements OnInit {
    date: Date;
    isLogged: boolean;
    token: Token;

    constructor(private localSession: SessionStorageService, private appService: AppService) {
        this.date = new Date();
    } 

    changeView(logged: any, token: Token) {
        console.log("LOGGED: ", logged);
        this.token = token;
        //this.isLogged = logged;
    }

    verifyToken(token: Token) {
        if(this.token) {
                this.appService.verifyToken(token)
                .subscribe(result => {
                    if(result.success) {
                        this.isLogged = true;
                    } else {
                        this.isLogged = false;
                    }
                })
        } 
    }

    
    ngOnInit() {
        if(this.token) {
            this.verifyToken(this.token);
        } 
        else {
            this.token = null;
        }
    }
}