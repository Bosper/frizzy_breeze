import { 
    Component, 
    OnInit, 
    trigger,
    state,
    style,
    transition,
  	animate,
    ElementRef,
    ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './app.service';

import { Album } from './album.class';
import { Photo } from './photo.class';
import { Vocabulary } from './app.vocabulary';
import { Test } from './test.class';

let styles = [
  require('./base.component.scss'),
  require('font-awesome/css/font-awesome.css')
];


@Component({
  selector: 'main',
  providers: [ Vocabulary ], 
  template : require('./base.component.html') ,
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
        trigger('albumDescription', [
            state('inactive', style({
                bottom: '0px',
                opacity: 0
            })),
            state('active', style({
                bottom: '10%',
                opacity: 1
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-in'))
        ]),
        trigger('albumTitle', [
            state('inactive', style({
                marginTop: '0px',
                opacity: 0
            })),
            state('active', style({
                marginTop: '10%',
                opacity: 1
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-in'))
        ])
    ]
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

    active(album: Album, event: Event) { 
        album.state = 'active';
        console.log("ENTERED MOUSENTER");    
    }

    inactive(album: Album, event: Event) { 
        album.state = 'inactive';
        console.log("ENTERED LEAVE"); 
    }

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
  
  getCoverPhoto(cover: number) {
    //console.log("COVER: ", this.photos.filter( photo => photo.id === cover ));
    let photos:Photo[] = this.photos.filter( photo => photo.id === cover );
    let photo = JSON.stringify(photos[0].url);
    //console.log("COVER: ", photo);
    
    return photos[0].url;
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
    this.getPhotos();
    this.getAlbums();
    this.getStartAlbums();
  }
}