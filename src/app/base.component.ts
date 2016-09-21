import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

import { Album } from './album.class';
import { Photo } from './photo.class';

@Component({
  selector: 'my-app',
  template: `
  <h1>Base Component</h1>
<ul>
    <li *ngFor="let item of albums" (click)="dope(item)">{{ item.title }}</li>
</ul>
<button type="text" (click)="logAlbums()">GET Albums</button>
<button type="text" (click)="logPhotos()">GET Photos</button>
<button type="text" (click)="getPhotos( albums )">GET Photos</button>
  `
})

export class BaseComponent implements OnInit {
  constructor(private appService: AppService) { }

  albums: Album[];
  photos: Photo[];
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

  logAlbums() {
    console.log(this.albums);
  }

  logPhotos() {
    console.log(this.photos);
  }


  dope(item: any) {
    console.log(item);
  }

  ngOnInit() {
    this.getAlbums();
    this.getPhotos();
  }
}