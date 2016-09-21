import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
   <h1>{{title}}</h1>
   <a routerLink="/">lounge exposure</a>
   <router-outlet></router-outlet>
 `
})

export class RootComponent {
    title: string = 'Root Component';
}