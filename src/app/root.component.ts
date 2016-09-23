import { Component } from '@angular/core';
import { SocialComponent } from './social.component';

@Component({
    selector: 'app',
    templateUrl : './src/app/root.component.html'
})

export class RootComponent {
    title: string = 'Root Component';
}