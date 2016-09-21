import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Album } from './album.class';
import { Photo } from './photo.class';

@Injectable()
export class AppService {
    constructor( private http: Http ) {}

    private albumUrl = "app/albums";
    private photoUrl = "app/photos";

    getAlbums(): Promise<Album[]> {
        return this.http
            .get( this.albumUrl )
            .toPromise()
            .then( (res:Response) => res.json().data as Album[] )
            .catch( this.handleError );
    }

    getPhotos(): Promise<Photo[]> {
        return this.http
            .get( this.photoUrl )
            .toPromise()
            .then( (res:Response) => res.json().data as Photo[] )
            .catch( this.handleError );
    }

    // getPhotosForAlbum( item: any[] ) {
    //     return this.getAlbums()
    //         .then( function (albums) {
    //             let albumPhoto = albums.filter(  ) 
    //         } )
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}