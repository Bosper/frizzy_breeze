import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './app.service';

import { Album } from './album.class';
import { Photo } from './photo.class';

@Component({
  selector: 'my-app',
  templateUrl : `./src/app/base.component.html` 
})

export class BaseComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) { }

  albums: Album[];
  photos: Photo[];
  activePhotos: any;
  error: any;

  getAlbums() {
    return this.appService.getAlbums()
      .then(result => this.albums = result)
      .catch(error => this.error = error)
  }

  getPhotos() {
    return this.appService.getPhotos()
      .then(result => this.photos = result)
      .catch(error => this.error = error)
  }

  goDetail(album: Album) {
    this.router.navigate([ '/story', album.id ])
  }

  getAlbumPhotos(albumPhotosId: number[]) {
    console.log(albumPhotosId);
    this.appService.getAlbumPhotos( albumPhotosId )
      .then( activePhotos => {this.activePhotos = activePhotos; console.log(activePhotos);
      } )
      .catch(error => this.error = error)
    
  }

  logAlbums() {
    console.log(this.albums);
  }

  logPhotos() {
    console.log(this.photos);
  }

  ngOnInit() {
    this.getAlbums();
    this.getPhotos();
  }
}