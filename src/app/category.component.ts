import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from './app.service';

import { Album } from './album.class';

@Component({
    selector: 'category',
    templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {
    constructor( private appService: AppService, private route: ActivatedRoute ) { }

    sub: any;
    error: any;
    categoryAlbums: Album[];

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                if (params[ 'id' ] != undefined) {
                    let id = +params[ 'id' ]
                    console.log(id);
                    
                    this.appService.getCategoryAlbums(id)
                        .then( categoryAlbums => {this.categoryAlbums = categoryAlbums; console.log(this.categoryAlbums);
                        } )
                        .catch(this.error);
                }
            }
        )
    }

}