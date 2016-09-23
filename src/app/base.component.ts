import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './app.service';

import { Album } from './album.class';
import { Photo } from './photo.class';
import { Vocabulary } from './app.vocabulary';

@Component({
  selector: 'main',
  providers: [ Vocabulary ], 
  templateUrl : `./src/app/base.component.html` 
})

export class BaseComponent implements OnInit {
  constructor(private appService: AppService, private router: Router, private vocabulary: Vocabulary) { }

  activeAlbums: Album[]
  albums: Album[];
  photos: Photo[];
  activePhotos: any;
  error: any;
  public share: any = 'test';

  getAlbums() {
    return this.appService.getAlbums()
      .then(result => this.albums = result)
      .catch(error => this.error = error)
  }

  getStartAlbums() {
    return this.appService.getStartAlbums()
    .then( album => this.activeAlbums = album )
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

  logAlbums() {
    console.log(this.albums);
  }

  logPhotos() {
    console.log(this.photos);
  }

  ngOnInit() {
    this.getAlbums();
    this.getPhotos();
    this.getStartAlbums();
  }
}