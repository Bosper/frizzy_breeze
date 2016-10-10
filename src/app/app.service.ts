import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { Album } from './album.class';
import { Photo } from './photo.class';
import { Navigation } from './navigation.class';
import { User } from './login.class';

import 'rxjs/add/operator/map';

import { Test } from './test.class';

@Injectable()
export class AppService {
    constructor(private http: Http) {}

    private albumUrl = "app/albums";
    private photoUrl = "app/photos";
    private navUrl = "app/navigation";

    private newPhotoUrl = "http://127.0.0.1:3005/test";
    private signInUrl = "http://127.0.0.1:3005/login";

    access: boolean = false;

    getTest(): Promise<Test[]> {
        return this.http
            .get( this.newPhotoUrl )
            .toPromise()
            .then( (res:Response) => res.json() as Test[] )
            .catch(this.handleError);
    }

    // getTest(): Observable<Test[]> {
    //     return this.http
    //         .get( this.newPhotoUrl )
    //         .map( (res:Response) => res.json().data )
    //         .catch(this.handleError);
    // }

    getNavigation(): Promise<Navigation[]>  {
        return this.http
            .get( this.navUrl )
            .toPromise()
            .then( (res: Response) => res.json().data )
            .catch(this.handleError);
    }

    getAlbums(): Promise<Album[]> {
        return this.http
            .get(this.albumUrl)
            .toPromise()
            .then((res: Response) => res.json().data as Album[])
            .catch(this.handleError);
    }

    getPhotos(): Promise<Photo[]> {
        return this.http
            .get(this.photoUrl)
            .toPromise()
            .then((res: Response) => res.json().data as Photo[])
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
                    console.log(albumPhotosId[i]);
                    let element = photos.find(photos => photos.id === albumPhotosId[i])
                    activePhotos.push(element);
                }
                console.log(albumPhotosId, photos, activePhotos);
                return activePhotos;
            })
    }

    getUser(): Promise<User[]> {
        return this.http.get( this.signInUrl )
            .toPromise()
            .then((result: Response) => result.json().data as User[])
            .catch(this.handleError);
    }

    signIn(dataUser: Object): Observable<User> {
       dataUser = JSON.stringify(dataUser);
       debugger;

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3005'
        });
        let options = new RequestOptions({ headers: headers });

        console.log("data: ", dataUser, "\nHeaders: ", headers);
    
        return this.http
            .post( this.signInUrl, dataUser, options)
            .map( (res:Response) => res.json().data || {  } as User )
            .catch(this.handleError);

    }

    // signIn(data:Object): Promise<User> {
    //     let body = JSON.stringify({data});
    //     let headers = new Headers({
    //         'Content-type': 'application/json',
    //         'Access-Control-Allow-Origin': 'http://127.0.0.1:3005',
    //         'Accept': 'q=0.8;application/json;q=0.9'
    //     });
    //     let options = new RequestOptions({
    //         headers: headers
    //     });
    //     console.log(this.signInUrl);
        
    //     return this.http.post( this.signInUrl, body, options)
    //         .toPromise()
    //         .then(this.extractData)
    //         .catch(this.handleError);

    // }

    // private extractData(res: Response) {
    //     let body = res.json();
    //     debugger;
    //     console.log('service: ', body.data);
    //     return body.data || { };
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}