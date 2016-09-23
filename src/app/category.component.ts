import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'category',
    templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {
    constructor( private appService: AppService, private route: ActivatedRoute ) { }

    sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                if (params[ 'category' ] != undefined) {
                    let category = +params[ 'category' ]
                    console.log(category);
                    
                }
            }
        )
    }

}