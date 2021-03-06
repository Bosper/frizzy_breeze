import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './app.service';

import { Album } from './album.class';
import { Photo } from './photo.class';
import { Vocabulary } from './app.vocabulary';
import { Test } from './test.class';

@Component({
  selector: 'main',
  providers: [ Vocabulary ], 
  template : require('./base.component.html') 
})

export class BaseComponent implements OnInit {
  constructor(private appService: AppService, private router: Router, private vocabulary: Vocabulary) { }

  activeAlbums: Album[];
  albums: Album[];
  photos: Photo[];
  activePhotos: any;
  error: any;
  public share: any = 'test';
  test: Test[];

  logBaaS() {
    return this.appService.getTest() 
      .then(result => this.test = result)
      .catch(error => this.error = error)
  }

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
    //this.getAlbums();
    //this.getPhotos();
    //this.getStartAlbums();
  }
}