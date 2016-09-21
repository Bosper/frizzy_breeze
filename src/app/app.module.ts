import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryData }  from './in-memory-data';

import { routing } from './app.routing';
import { AppService } from './app.service';

import { BaseComponent } from './base.component';
import { RootComponent } from './root.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryData),
        routing
    ],
    declarations: [BaseComponent, RootComponent],
    providers: [AppService],
    bootstrap: [RootComponent]
})
export class AppModule { }