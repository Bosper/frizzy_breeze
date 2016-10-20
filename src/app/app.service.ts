import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { Album } from './album.class';
import { Photo } from './photo.class';
import { Navigation } from './navigation.class';
import { User } from './login.model';
import { Token } from './token.model';

import 'rxjs/add/operator/map';

import { Test } from './test.class';

@Injectable()
export class AppService {
    constructor(private http: Http) {}

    private albumUrl = "app/albums";
    private photoUrl = "app/photos";
    private navUrl = "app/navigation";

    private newPhotoUrl = "http://127.0.0.1:3005/test";
    private API_END_POINT = "http://127.0.0.1:3005/api";

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
            .then((res: Response) => res.json().data as Album[])
            .catch(this.handleError);
    }

    getPhotos(): Promise<Photo[]> {
        return this.http
            //.get(this.photoUrl)
            .get(this.API_END_POINT + "/photos")
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

    signIn(userData: Object): Observable<any> {
        let body = JSON.stringify(userData);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3005'
        });

        return this.http
            .post( this.API_END_POINT + "/authenticate", body, { headers: headers } )
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    verifyToken(token:string): Observable<any> {
        let body = JSON.stringify({token: token});
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3005'
        });

        return this.http
            .post(this.API_END_POINT + "/tokenCheck", body, {headers: headers})
            .map((res:Response) => res.json())
            .catch(this.handleError);

    }

    // getToken(token: string): Promise<String>  {

    //     let body = JSON.stringify(token);

    //     let headers = new Headers({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': 'http://127.0.0.1:3005'
    //     });

    //     return this.http
    //         .post( this.API_END_POINT + '/token', body, {headers: headers} )
    //         .toPromise()
    //         .then( (res: Response) => res.json() )
    //         .catch(this.handleError);
    // }

    // verifyToken(token: string): Observable<Object> {
    //     let headers = new Headers({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': 'http://127.0.0.1:3005'
    //     });
    //     let body = JSON.stringify(token);
    //     console.log("SERVICE BODY: ", body);
    //     return this.http
    //         .post(this.API_END_POINT + "/tokenCheck", body, { headers: headers })
    //         .map((res:Response) => res.json())
    //         .catch(this.handleError);
    // }

    // signIn(dataUser: Object): Observable<Token> {
    //     let headers = new Headers({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': 'http://127.0.0.1:3005'
    //     });
    //     let options = new RequestOptions({ headers: headers });

    //     dataUser = JSON.stringify(dataUser);
    //     console.log("data: ", dataUser, "\nHeaders: ", headers);
    
    //     return this.http
    //         .post( this.API_END_POINT + "/authenticate", dataUser, {headers: headers})
    //         .map( (res:Response) => res.json() as Token )
    //         .catch(this.handleError);

    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}