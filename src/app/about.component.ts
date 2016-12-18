import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import { Page } from './page.model';

let aboutStyle = require('./about.component.scss');

@Component({
    selector: 'about-me',
    template : require('./about.component.html'),
    styles: [aboutStyle]
})
export class AboutComponent implements OnInit {

    pages: Page;

    constructor( private appService: AppService ) {

    }

    getBio() {
        this.appService.getBio()
            .subscribe(res => this.pages = res, res => console.log("ERROR, Can't join BIO."))
    }

    ngOnInit() {
        this.getBio();
    }

}