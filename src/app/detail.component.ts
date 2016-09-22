import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from './app.service';
import { Album } from './album.class';
import { Photo } from './photo.class';

@Component({
    selector: 'album',
    templateUrl : `./src/app/detail.component.html` 
})

export class DetailComponent implements OnInit {

    constructor( private route: ActivatedRoute, private appService: AppService ) {}

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
        )
        
    }
}