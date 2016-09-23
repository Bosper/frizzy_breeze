import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'social',
     templateUrl : `./src/app/social.component.html`
})
export class SocialComponent implements OnInit {
    constructor() { }

    share: any = 'test';

    ngOnInit() {
        
    }

}