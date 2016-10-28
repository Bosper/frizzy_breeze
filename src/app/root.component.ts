import { Component, ViewContainerRef, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from './app.service'

import { Navigation } from './navigation.class';

import { SocialComponent } from './social.component';
import { DashboardComponent } from './dashboard.component';

//import './root.component.scss';
import * as _ from 'lodash';

    

@Component({
    selector: 'app',
    template : require('./root.component.html'),
    styleUrls: ["./root.component.scss"],
    encapsulation: ViewEncapsulation.None
})

export class RootComponent implements OnInit {

    title: string = 'Lounge Exposure';
    navigation: Navigation[];
    error: any;
    logged: boolean = true;
    x:boolean;

    constructor( private appService: AppService, private route: ActivatedRoute, private router: Router, private viewContainerRef:ViewContainerRef ) {

    }

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
        console.log("Lodash Version: ", _.VERSION);

        
            
    }


}