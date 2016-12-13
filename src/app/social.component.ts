import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'social',
    template : require('./social.component.html'),
    styleUrls: ['social.component.scss']
})
export class SocialComponent implements OnInit {
    constructor() { }

    share: any = 'test';

    ngOnInit() {
        
    }

}