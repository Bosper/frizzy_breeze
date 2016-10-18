import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

import { LoginComponent } from './login.component';
import { AppService } from './app.service';


@Component({
    selector: 'dashboard',
    template : require('./dashboard.component.html')
})
export class DashboardComponent implements OnInit {
    date: Date;
    isLogged: boolean = true;
    token: string;

    constructor(private localSession: SessionStorageService, private appService: AppService) {
        this.date = new Date();
    } 

    // changeView(logged: any) {
    //     console.log("LOGGED: ", logged);
    //     this.isLogged = logged;
    //     this.token = this.localSession.retrieve('token');
    // }

    changeView() {
        let token = this.localSession.retrieve('token');
        if (token) {
            this.appService.verifyToken(token)
                .subscribe(result => {
                    console.log(result);
                    if (result.success) {
                        this.isLogged = true;
                        console.log("DASHBOARD LOG TRUE", this.isLogged);
                    } else {
                        this.isLogged = false;
                        console.log("DASHBOARD LOG FALSE", this.isLogged);
                    }
                })
            
        } else {
            this.isLogged = false;
        }
    }

    verifyToken(token: string) {
        this.appService.verifyToken(token)
            .subscribe(result => console.log(result))
    }

    // checkToken() {
    //     this.appService.getToken(this.token)
    //         .then( result => {
    //             this.token === result;
    //             this.appService.verifyToken(this.token)
    //                 .subscribe( result => console.log(result))
    //         });
    // }


    
    ngOnInit() {
        this.changeView();
    }
}