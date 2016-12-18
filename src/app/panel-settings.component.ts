import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';

import { Page } from './page.model';

let panelSettings = require('./panel-settings.component.scss');

@Component({
    selector: 'panel-settings',
    templateUrl: './panel-settings.component.html',
    styles: [panelSettings]
})
export class PanelSettingsComponent implements OnInit, AfterViewInit {

    pages: Page[];
    chosenPage: Page;
    pageForm: FormGroup;

    constructor(private appService: AppService) {
        this.pageForm = new FormGroup({
            id: new FormControl({disabled: true}),
            title: new FormControl(''),
            paragraph1: new FormControl(''),
            paragraph2: new FormControl(''),
            paragraph3: new FormControl('')
        });
    }

    getPages() {
        this.appService.getPages()
            .subscribe(res => {this.pages = res; console.log(this.pages)}, res => console.log("ERROR WITH PAGES"))
    }

    showModel(page:Page) {
        console.log(page);
        this.chosenPage = page;
    }

    onSubmit(page:FormGroup) {
        console.log(page.value);
        console.log(page.valueChanges);
    }

    ngOnInit() {
        this.getPages();
    }

    ngAfterViewInit() {
        
    }

}