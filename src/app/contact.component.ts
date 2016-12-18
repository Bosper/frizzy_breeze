import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AppService } from './app.service';

let contactStyles = require("./contact.component.scss");

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styles: [contactStyles]

})
export class ContactComponent implements OnInit {

    contactForm: FormGroup;

    constructor( private appService: AppService ) {
        this.contactForm = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {}

}