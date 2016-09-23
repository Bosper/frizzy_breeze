import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Album } from './album.class';
import { Photo } from './photo.class';

@Injectable()
export class AppService {
    constructor(private http: Http) { }

    private albumUrl = "app/albums";
    private photoUrl = "app/photos";

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
            .then( (albums) => albums.filter( album => album.start === true ))
            .catch(this.handleError);
    }

    getAlbum(id: number) {
        return this.getAlbums()
            .then(albums => albums.find(album => album.id === id))
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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}