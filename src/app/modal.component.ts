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
    editedPhotos: number[];
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
        this.editedPhotos = [];
    }

    passAlbum(album: FormGroup) {
        let newAlbum: Album = album.value;
        console.log(newAlbum);
        this.emitAlbum.emit(newAlbum);
    }

    closeModal() {
        this.modal.hide();
    }

    createAlbum() {
        this.album = new Album();
        console.log(this.album);
        this.editAlbum = false;
        console.log("EDIT: ", this.editAlbum);
        this.modal.show();
    }

    modifyAlbum(album: Album) {

        let coverImage: Photo;

        this.album = album;
        this.editAlbum = true;
        this.getAlbumPhotos();
        
        this.albumNotPhotos = _.differenceWith(this.photos, this.albumPhotos, _.isEqual);
        // coverImage = this.albumNotPhotos.find( photo => photo.id === 1 );
        // this.albumNotPhotos.splice(this.albumNotPhotos.indexOf(coverImage), 1);
        console.log("+: ", this.albumPhotos, this.albumNotPhotos);
        this.selectCover();
        this.modal.show();
    }

    selectCover() {
        //console.log("SELECT COVER: ALBUM PHOTOS: ", albumPhotos);
        
        // if (this.album.cover && this.album.cover != 1) {
            this.cover = this.albumPhotos.find( photo => photo.id === this.album.cover );
            console.log("COVER: ", this.cover);
        // } else { 
        //     this.cover = new Photo();
        //     this.cover.id = 0; 
        // }
    }


    choseCover(photo:Photo) {
        this.cover = photo;
        this.album.cover = this.cover.id;
        console.log(this.cover);
        
    }

    getAlbumPhotos() {
        let activePhotos: Photo[] = [];
        let albumPhotosId: number[] = this.album.photoId;
        console.log("GET ALBUM PHOTOS: ALBUM PHOTOS ID: ", albumPhotosId);      

            for (let i = 0; i < albumPhotosId.length; i++) {
                console.log("FAAAIL!", albumPhotosId[i], this.photos);

                let element = this.photos.find(photos => photos.id === albumPhotosId[i])
                activePhotos.push(element);

            }
            this.albumPhotos = activePhotos;

            // let coverImage = activePhotos.find( photo => photo.id === 1 );
            // activePhotos.splice(activePhotos.indexOf(coverImage), 1);
            console.log("GET ALBUM PHOTOS: ", albumPhotosId, activePhotos);
            

    }

    checkPhoto(photo:Photo, albumNotPhotos:Photo[]) {
        let albumPhotos: Photo[];
        albumPhotos = this.albumPhotos;
        if (this.album.photoId.indexOf(photo.id) === -1) {
            this.album.photoId.push(photo.id);
            this.albumNotPhotos.splice(albumNotPhotos.indexOf(photo), 1);
            //console.log("ALBUM NOT PHOTOS: ", albumNotPhotos);

        }
        else {
            this.album.photoId.splice(this.album.photoId.indexOf(photo.id), 1);
            this.albumNotPhotos = _.concat([photo], this.albumNotPhotos);
        }
        
        this.getAlbumPhotos();
        //console.log("ALBUM PHOTO ID: ", this.album.photoId);

    }

    checkAlbum() {
        console.log(this.album);
        
    }

    pushPhotos():void {
        let temp = _.union(this.album.photoId, this.editedPhotos);
        this.album.photoId = temp;
        this.editedPhotos = [];

        console.log("ALBUM: ", this.album.photoId);
        console.log("Photos: ", temp);
        
    }

    ngOnInit() {
        console.log(this.album);
        
    }
}