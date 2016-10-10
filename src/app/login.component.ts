import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { User } from './login.class';

@Component({
    selector: 'login',
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    passport: FormGroup;
    users: User[];

    user: User[];
    result: any;

    constructor(private formBuilder: FormBuilder, private appService: AppService) {
        this.passport = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        })
    }

    // onSubmit(form:FormGroup):void {
    //     if (form.valid) {
    //         console.log(form.controls, form.value, form.value.username, form.value.password);
    //         this.appService.getUser()
    //             .then( result => {this.users = result; console.log(this.users)})
            

    //     } else {
    //         console.log("Form is not VALID!");
            
    //     }
    // }

    onSubmit(form:FormGroup) {
        let userform: FormGroup = form.value;
        console.log("userform: ", userform);
        
        if (form.valid) {
            console.log(form.value);
            this.appService.signIn(userform)  
                .subscribe(form => console.log('subscribe: ', form))
        } else {
            console.log("Form is not VALID!"); 
        }
    }



    ngOnInit() { }

}