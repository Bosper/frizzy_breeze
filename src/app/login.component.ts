import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AppService } from './app.service';

@Component({
    selector: 'login',
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    passport: FormGroup;

    constructor(private formBuilder: FormBuilder, private appService: AppService) {
        this.passport = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
        })
    }

    onSubmit(form:FormGroup):void {
        if (form.valid) {
            console.log(form.controls, form.value, form.value.username, form.value.password);
            this.appService.signIn(form.value.username, form.value.password)
            

        } else {
            console.log("Form is not VALID!");
            
        }
    }



    ngOnInit() { }

}