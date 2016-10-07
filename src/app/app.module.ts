import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryData }  from './in-memory-data';

import { routing } from './app.routing';
import { AppService } from './app.service';

import { RootComponent } from './root.component';
import { BaseComponent } from './base.component';
import { DetailComponent } from './detail.component';
import { CategoryComponent } from './category.component';
import { AboutComponent } from './about.component';
import { SocialComponent } from './social.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { PanelComponent } from './panel.component';

import { OrderByPipe } from '../pipes/sort.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        //InMemoryWebApiModule.forRoot(InMemoryData),
        routing
    ],
    declarations: [
        //Components
        RootComponent, 
        BaseComponent, 
        DetailComponent, 
        AboutComponent, 
        CategoryComponent, 
        SocialComponent, 
        DashboardComponent,
        LoginComponent,
        PanelComponent,
        //Pipes
        OrderByPipe
        ],
    providers: [AppService, SocialComponent],
    bootstrap: [RootComponent]
})
export class AppModule { }