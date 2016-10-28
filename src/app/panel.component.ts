import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';


import { AppService } from './app.service'; 
import { ModalComponent } from './modal.component'; 

import { Album } from './album.class';
import { Photo } from './photo.class';


@Component({
    selector: 'panel',
    template: require('./panel.component.html'),
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PanelComponent implements OnInit {
    
    albums: Album[];
    photos: Photo[];
    error: any;
    album: Album;
    editAlbum: boolean;

    constructor(private appService: AppService) {
        //this.editAlbum = false;
    }

    @ViewChild(ModalComponent)
    private modalComponent: ModalComponent;

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

    getCoverPhoto(cover: number) {
        let photos:Photo[] = this.photos.filter( photo => photo.id === cover );
        let photo = JSON.stringify(photos[0].url);
    return photos[0].url;
    }

    sendAlbum(album: Album) {
      console.log(album);
      if (album.id) {
        console.log("EDYCJA");
        this.appService.updateAlbum(album)
            .subscribe( response => console.log(response))
      } else { 
        console.log("NOWY"); 
        this.appService.createAlbum(album)
            .subscribe( response => console.log(response))
      }
    }

    passAlbum (album: Album) {
        console.log("ALBUM: ", album );
        this.modalComponent.modifyAlbum(album);
        
    }

    ngOnInit() {
        this.getPhotos();
        this.getAlbums();
    }

}