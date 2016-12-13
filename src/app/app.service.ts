import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { Album } from './album.class';
import { Photo } from './photo.class';
import { Navigation } from './navigation.class';
import { User } from './login.model';
import { Token } from './token.model';
import { Status } from './status.model';

import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';

import { Test } from './test.class';

import * as _ from 'lodash';

@Injectable()
export class AppService {
    constructor(private http: Http) {}

    private albumUrl = "app/albums";
    private photoUrl = "app/photos";
    private navUrl = "app/navigation";

    private newPhotoUrl = "http://127.0.0.1:3005/test";
    private API_END_POINT = "http://127.0.0.1:3005/api";
    //private API_END_POINT = "/api";

    private headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
        });

    getTest(): Promise<Test[]> {
        return this.http
            .get( this.newPhotoUrl )
            .toPromise()
            .then( (res:Response) => res.json() as Test[] )
            .catch(this.handleError);
    }

    getNavigation(): Promise<Navigation[]>  {
        return this.http
            // .get( this.navUrl )
            .get(this.API_END_POINT + "/navigation")
            .toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError);
    }

    getAlbums(): Promise<Album[]> {
        return this.http
            //.get(this.albumUrl)
            .get(this.API_END_POINT + "/albums")
            .toPromise()
            .then((res: Response) => res.json() as Album[])
            .catch(this.handleError);
    }

    getPhotos(): Promise<Photo[]> {
        return this.http
            //.get(this.photoUrl)
            .get(this.API_END_POINT + "/photos")
            .toPromise()
            .then((res: Response) => res.json() as Photo[])
            .catch(this.handleError);
    }


    getStartAlbums() {
        return this.getAlbums()
            .then( (albums) => albums.filter( startAlbum => startAlbum.start === true && startAlbum.active === true ))
            .catch(this.handleError);
    }

    getAlbum(id: number) {
        return this.getAlbums()
            .then(albums => albums.find(album => album.id === id))
            .catch(this.handleError);
    }

    getCategoryAlbums(id: number) {
        return this.getAlbums()
            .then( albums => albums.filter( categoryAlbums => categoryAlbums.category === id && categoryAlbums.active === true ) )
            .catch(this.handleError);
    }

    getAlbumPhotos(albumPhotosId: number[]) {
        let activePhotos: Photo[] = [];
        return this.getPhotos()
            .then((photos) => {
                for (let i = 0; i < albumPhotosId.length; i++) {
                    let element = photos.find(photos => photos.id === albumPhotosId[i])
                    activePhotos.push(element);
                }
                console.log(albumPhotosId, photos, activePhotos);
                return activePhotos;
            })
    }

    //AUTHORISATION
    signIn(userData: Object): Observable<any> {
        let body = JSON.stringify(userData);

        return this.http
            .post( this.API_END_POINT + "/authenticate", body, { headers: this.headers } )
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    verifyToken(token:string): Observable<any> {
        let body = JSON.stringify({token: token});

        return this.http
            .post(this.API_END_POINT + "/tokenCheck", body, { headers: this.headers })
            .map((res:Response) => res.json())
            .catch(this.handleError);

    }

    //DASHBOARD
    createAlbum(album: Album): Observable<Status> {
        let body = JSON.stringify(album);

        return this.http
            .post(this.API_END_POINT + '/createAlbum', body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateAlbum(album: Album): Observable<Status> {
        let body = JSON.stringify(album);

        return this.http
            .post(this.API_END_POINT + '/updateAlbum', body, { headers: this.headers })
            .map((res: Response) => res.json() as Status)
            .catch(this.handleError);
    }

    deleteAlbum(album:Album) {
        let body = JSON.stringify(album);
        console.log(body);

        return this.http
            .post(this.API_END_POINT + '/deleteAlbum', body, { headers: this.headers })
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}