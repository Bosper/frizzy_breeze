import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
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

    constructor(private formBuilder: FormBuilder, private appService: AppService) {
        this.passport = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        });

        //this.token = new Token();
        //this.token = {success: false, message: "Not authenticated", token: "empty"};

        this.updateLogin = new EventEmitter();
    }

    onSubmit(form:FormGroup) {
        let userform: FormGroup = form.value;
        console.log("userform: ", userform);
        
        if (form.valid) {
            this.appService.signIn(userform)  
                .subscribe(result => {
                    if(result.success) {
                        this.token = result
                        this.logged = true;
                        this.updateLogin.emit(this.logged)
                    } else {
                        console.log("FAILED LOGIN!")
                    }
                    
                });
        } else {
            console.log("Form is not VALID!"); 
        }
    }

    verifyToken(token: Token) {
        if(this.token) {
            this.appService.verifyToken(token)
            .subscribe(result => {
                console.log("RESULT: ", result);
                console.log("TOKEN SUCCESS: ", this.token);
                if(result.success) {
                    this.logged = true;
                    console.log("IF TRUE: ", this.logged);
                    this.updateLogin.emit(this.logged);
                } else {
                    this.logged = false;
                    console.log("IF FASLE: ", this.logged);
                }
            });
        } else {
            console.log("NO TOKEN PROVIDED");
        }
    }

    checkToken() {
        console.log(this.token, "LOGGED: ", this.logged, this.verifyToken(this.token));
    }


    ngOnInit() {
        //console.log("ONINIT: ", this.token);
        this.verifyToken(this.token);
        // localStorage.setItem('Token', JSON.stringify({ success: false, message: "Not authenticated", token: "empty" }));

        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // var token = currentUser.token; // your token
        // console.log(token);
    }

}