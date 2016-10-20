import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from './app.service'

import { Navigation } from './navigation.class';

import { SocialComponent } from './social.component';
import { DashboardComponent } from './dashboard.component';

@Component({
    selector: 'app',
    template : require('./root.component.html'),
})

export class RootComponent implements OnInit {
    constructor( private appService: AppService, private route: ActivatedRoute, private router: Router ) {

    }

    title: string = 'Root Component';
    navigation: Navigation[];
    error: any;
    logged: boolean = true;
    x:boolean;

    getNavigation() {
        this.appService.getNavigation()
            .then( nav => {this.navigation = nav; console.log(this.navigation);} )
            .catch(error => this.error = error)
    }

    showOnlyDashboard(dashboard: boolean) {
        console.log("DASHBOARD: ", dashboard);
    }

    hideHeader() {
        let href:string = window.location.href;
        let indexOf = href.lastIndexOf("authentication")
        if (indexOf != -1) this.x = false;
        else this.x = true;
    }

    ngOnInit() {
        this.getNavigation();
        this.hideHeader();

        
            
    }


}