import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

import { AppService } from './app.service';
import { User } from './login.model';
import { Token } from './token.model';

@Component({
    selector: 'login',
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    passport: FormGroup;
    users: User[];

    user: User[];
    logged: boolean = false;
    token: Token;

    @Output() updateLogin: EventEmitter<any>;

    constructor(
        private formBuilder: FormBuilder, 
        private appService: AppService, 
        private localStorage:LocalStorageService, 
        private localSession: SessionStorageService) {
            
        this.passport = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        });

        this.token = new Token();
        this.token = {success: false, message: "Not authenticated", token: "empty"};

        this.updateLogin = new EventEmitter();
    }

    signIn( form:FormGroup ) {

        if (form.valid) {
            this.appService.signIn(form.value)
                .subscribe(result => {
                    console.log(result);
                    if(result.success) {
                        console.log("LOGIN SUCCESS");
                        this.token = result;
                        this.localSession.store('token', this.token.token);
                        this.updateLogin.emit();
                    } else {
                        console.log("LOGIN FAILED");
                    }
                })
        } else console.log("INVALID FORM");
    }

   ngOnInit() {

    }

}