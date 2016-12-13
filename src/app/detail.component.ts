import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from './app.service';
import { Album } from './album.class';
import { Photo } from './photo.class';

let lightboxCSS = require("lightbox2/dist/css/lightbox.css") + require("./detail.component.scss");
//let detailComponentSCSS = require("./detail.component.scss");

@Component({
    selector: 'album',
    template : require('./detail.component.html'),
    styles: [lightboxCSS]
})

export class DetailComponent implements OnInit {

    constructor( private route: ActivatedRoute, private appService: AppService) {
    }

    sub: any;
    navigated: boolean = false;
    album: Album;
    error: any;
    activePhotos: Photo[];


    getAlbumPhotos(albumPhotosId: number[]) {
    console.log(albumPhotosId);
    this.appService.getAlbumPhotos( albumPhotosId )
      .then( activePhotos => { this.activePhotos = activePhotos; console.log(activePhotos);
      })
      .catch(error => this.error = error)
    
  }

  lightboxOpen(photo:Photo) {
      console.log("LIGHTBOX: ", photo);
      let lightbox = $(".lightbox--container");

    //   lightbox.css({
    //       "height": $(document).height(),
    //       "width": $(document).width(),
    //       "opacity": 1
    //   });


      
  }

    ngOnInit() {

        this.sub = this.route.params.subscribe(
            params => {
                if ( params[ 'id' ] != undefined ) {
                    let id = +params[ 'id' ];
                    this.navigated = true;

                    this.appService.getAlbum( id )
                        .then( album => {
                            this.album = album;
                            this.getAlbumPhotos(this.album.photoId);
                        })
                        .catch(this.error);
                }
            }
        );

        let menu = $("header");
        console.log(menu);
        
        
    }
}