import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';


import { AppService } from './app.service'; 
import { ModalComponent } from './modal.component'; 
import { ModalSmallComponent } from './modal-small.component'; 

import { Album } from './album.class';
import { Photo } from './photo.class';

const URL = 'http://127.0.0.1:3005/api/uploadPhotos';


@Component({
    selector: 'panel',
    template: require('./panel.component.html'),
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PanelComponent implements OnInit {

    public uploader:FileUploader = new FileUploader({url: URL});
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }
    
    albums: Album[];
    photos: Photo[];
    error: any;
    album: Album;
    editAlbum: boolean;

    constructor(private appService: AppService) {

    }

    @ViewChild(ModalComponent)
    private modalComponent: ModalComponent;

    @ViewChild(ModalSmallComponent)
    private modalSmallComponent: ModalSmallComponent;

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
        console.log("SENDALBUM: ALBUM EDITED");
        this.appService.updateAlbum(album)
            .subscribe( response => console.log(response))
      } else { 
        console.log("SENDALBUM: ALBUM NEW"); 
        this.appService.createAlbum(album)
            .subscribe( response => console.log(response))
      }
      this.modalComponent.closeModal();
    }

    openAlbum (album: Album) {
        console.log("OPENALBUM: ", album );
        this.modalComponent.modifyAlbum(album);
    }

    openPhoto(photo:Photo) {
        console.log("OPENPHOTO: ", photo);
        this.modalSmallComponent.modifyPhoto(photo);
    }

    ngOnInit() {
        this.getPhotos();
        this.getAlbums();
    }

    // ALBUM CRUD

    deleteAlbum(album:Album) {
        this.appService.deleteAlbum(album)
            .subscribe(response => console.log(response))
    }

}