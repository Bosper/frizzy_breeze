import { 
    Component, 
    OnInit, 
    trigger,
    state,
    style,
    transition,
  	animate,
    ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from './app.service';

import { Album } from './album.class';
import { Photo } from './photo.class';

//import * as $ from 'jquery';
//declare var $:JQueryStatic;

@Component({
    selector: 'category',
    template : require('./category.component.html'),
    styleUrls: ['./category.component.scss'],
    animations: [
        trigger('albumDescription', [
            state('inactive', style({
                bottom: '0px',
                opacity: 0
            })),
            state('active', style({
                bottom: '10%',
                opacity: 1
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-in'))
        ]),
        trigger('albumTitle', [
            state('inactive', style({
                marginTop: '0px',
                opacity: 0
            })),
            state('active', style({
                marginTop: '10%',
                opacity: 1
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-in'))
        ])
    ]
})
export class CategoryComponent implements OnInit {
    constructor( private appService: AppService, private route: ActivatedRoute, private router: Router, public elementRef: ElementRef ) { }

    sub: any;
    error: any;
    categoryAlbums: Album[];
    photos:Photo[];
    public flyOut: string = 'inactive';
    thisImg: string = '100px';
    target: any;

    active(album: Album, event: Event) { 
        album.state = 'active';
        console.log("ENTERED MOUSENTER");    
    }

    inactive(album: Album, event: Event) { 
        album.state = 'inactive';
        console.log("ENTERED LEAVE"); 
    }

    goDetail(album: Album) {
        this.router.navigate([ '/story', album.id ]);
    }

    getPhotos() {
        return this.appService.getPhotos()
        .then(result => this.photos = result)
        .catch(error => this.error = error)
    }

    getCoverPhoto(cover: number) {
        //console.log("COVER: ", this.photos.filter( photo => photo.id === cover ));
        let photos:Photo[] = this.photos.filter( photo => photo.id === cover );
        let photo = JSON.stringify(photos[0].url);
        //console.log("COVER: ", photo);
        
        return photos[0].url;
    }

    mouseOver() {
        let item = $(".album__item--story");
        let animate:boolean = false;
        

        // item.on("mouseover", function() {
        //     $(this).find(".album__item--description").stop(true, false).animate({
        //         bottom: "200"
        //     }, 100, "linear", function() {
        //         console.log( "ANIMATION DONE!" );
        //     });
            // .animate({
            //     bottom: "200"
            // }, 500, function() {
            //     console.log("ANIMATION DONE!");
            // });
        // });
    }

    mouseOut() {
        let item = $(".album__item--story");
            item.on("mouseout", function() {
            $(this).find(".album__item--description").stop().animate({
                bottom: "0"
            });
        });
    }


    ngOnInit() {

        this.getPhotos();
        this.sub = this.route.params.subscribe(
            params => {
                if (params[ 'id' ] != undefined) {
                    let id = +params[ 'id' ]
                    console.log('ID: ' + id);
                    
                    this.appService.getCategoryAlbums(id)
                        .then( categoryAlbums => {this.categoryAlbums = categoryAlbums; console.log(this.categoryAlbums);
                        } )
                        .catch(this.error);
                }
            }
        );

        let item = $(".album__item--story");
        // item.on("mouseover", function() {();
        //     $(this).find(".album__item--description").stop(true, false).animate({
        //         bottom: "+=200"
        //     }, 500, function() {
        //         console.log("ANIMATION DONE!");
        //     });
        // });


        console.log(item);
    }

}