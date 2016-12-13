import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, Input  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Album } from './album.class';
import { Photo } from './photo.class';

import { AppService } from './app.service';

import * as _ from 'lodash';

@Component({
    selector: 'modal',
    template: require('./modal.component.html'),
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ModalComponent implements OnInit {

    @ViewChild('lgModal') public modal:ModalDirective;
    @Output() emitAlbum: EventEmitter<any>;
    @Input() album: Album; 
    @Input() photos: Photo[]; 

    albumForm: FormGroup;
    albumPhotos: Photo[];
    albumNotPhotos: Photo[];
    editAlbum: boolean;
    cover: Photo;
    isCover: boolean = false;


    constructor(private appService: AppService) {
        this.albumForm = new FormGroup({
            id: new FormControl({value: "", disabled: true}, Validators.required),
            title: new FormControl("", Validators.required),
            desc: new FormControl("", Validators.required),
            photoId: new FormControl([1]),
            start: new FormControl("", Validators.required),
            category: new FormControl("", Validators.required),
            order: new FormControl("", Validators.required),
            active: new FormControl("", Validators.required),
            cover: new FormControl(1)
            
        });

        this.emitAlbum = new EventEmitter();
    }

    saveAlbum(album: FormGroup) {
        let newAlbum: Album = album.value;
        console.log("SAVEALBUM: ", newAlbum);
        this.emitAlbum.emit(newAlbum);
    }

    closeModal() {
        this.modal.hide();
    }

    createAlbum() {
        this.album = new Album();
        this.album.cover = 1;
        console.log("CREATE NEW ALBUM: ", this.album);
        this.editAlbum = false;
        this.modal.show();
    }

    getPhotos() {
        this.appService.getPhotos()
            .then( photos => this.photos = photos );
    }

    modifyAlbum(album: Album) {
        this.getPhotos();
        this.album = album;
        this.editAlbum = true;
        this.getAlbumPhotos();
        this.albumNotPhotos = _.differenceWith(this.photos, this.albumPhotos, _.isEqual);
        console.log("MODIFYALBUM: ALBUM PHOTOS: ", this.albumPhotos, "PHOTOS NOT IN ALBUM: ", this.albumNotPhotos);
        this.findCurrentCover();
        this.modal.show();
    }



    findCurrentCover() {
        this.cover = this.albumPhotos.find( photo => photo.id === this.album.cover );
        console.log("FIND CURRENT COVER: ", this.cover);
    }


    selectCover(photo:Photo) {
        this.cover = photo;
        this.album.cover = this.cover.id;
        console.log("SELECTED COVER: ", this.cover);
        
    }

    getAlbumPhotos() {
        let activePhotos: Photo[] = [];
        let albumPhotosId: number[] = this.album.photoId;
        console.log("GET ALBUM PHOTOS: ALBUM PHOTOS ID: ", albumPhotosId);      

            for (let i = 0; i < albumPhotosId.length; i++) {
                let element = this.photos.find(photos => photos.id === albumPhotosId[i])
                activePhotos.push(element);
            }
            this.albumPhotos = activePhotos;
            console.log("GET ALBUM PHOTOS: ", activePhotos);   

    }

    checkPhoto(photo:Photo, albumNotPhotos:Photo[]) {
        let albumPhotos: Photo[];
        albumPhotos = this.albumPhotos;

        if (this.album.photoId.indexOf(photo.id) === -1) {
            this.album.photoId.push(photo.id);
            this.albumNotPhotos.splice(albumNotPhotos.indexOf(photo), 1);
        }
        else {
            this.album.photoId.splice(this.album.photoId.indexOf(photo.id), 1);
            this.albumNotPhotos = _.concat([photo], this.albumNotPhotos);
        }  
        this.getAlbumPhotos();
    }

    ngOnInit() {
        console.log(this.album);
        
    }
}