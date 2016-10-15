import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service'

import { Navigation } from './navigation.class';

import { SocialComponent } from './social.component';

@Component({
    selector: 'app',
    template : require('./root.component.html')
})

export class RootComponent implements OnInit {

    constructor( private appService: AppService ) {

    }

    title: string = 'Root Component';
    navigation: Navigation[];
    error: any;
    logged: boolean = true;

    getNavigation() {
        this.appService.getNavigation()
            .then( nav => {this.navigation = nav; console.log(this.navigation);} )
            .catch(error => this.error = error)
    }

    ngOnInit() {
        //this.getNavigation();
    }


}