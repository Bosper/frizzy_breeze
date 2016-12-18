import { Component, 
    OnInit, 
    ViewEncapsulation, 
    Input, 
    ViewChild, 
    trigger,
    state,
    style,
    transition,
  	animate, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';


import { AppService } from './app.service'; 
import { ModalComponent } from './modal.component'; 
import { ModalSmallComponent } from './modal-small.component'; 

import { Album } from './album.class';
import { Photo } from './photo.class';
import { PanelMenu } from './panelmenu.model';

const URL = 'http://127.0.0.1:3005/api/uploadPhotos';


@Component({
    selector: 'panel',
    template: require('./panel.component.html'),
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('menuPanel', [
            state('inactive', style({
                width: '50px'
            })),
            state('active', style({
                width: '150px'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-in'))
        ])
    ]
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
    
    panelMenu: PanelMenu[];
    albums: Album[];
    photos: Photo[];
    error: any;
    album: Album;
    editAlbum: boolean;
    menuState: string;
    

    panel_1: boolean = true;
    panel_2: boolean = false;
    panel_3: boolean = false;

    constructor(private appService: AppService) {
        this.menuState = 'inactive';
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

  //Menu
  getPanelMenu() {
      this.appService.getPanelMenu()
        .subscribe( Response => this.panelMenu = Response )
  }
  
  toggleState() {
      if (this.menuState === 'inactive') this.menuState = 'active';
      else this.menuState = 'inactive';
    }

    changeView(menu:PanelMenu) {
        let panelMenu = this.panelMenu;
        let panelId = menu.id;

        this.panel_1 = false;
        this.panel_2 = false;
        this.panel_3 = false;

        for (let i = 0; i < panelMenu.length; i++) {
            if (panelMenu[i] != menu) panelMenu[i].status = false;
            else panelMenu[i].status = true; }

        this.panelMenu = panelMenu;

        if (menu.id === 1 && menu.status === true) this.panel_1 = true;
        else if (menu.id === 2 && menu.status === true) this.panel_2 = true;
        else if (menu.id === 3 && menu.status === true) this.panel_3 = true;
        else console.log("ERROR PANEL NAV");

        
        console.log(this.panelMenu);
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

    updatePhoto(photo:Photo) {
        console.log(photo);
        this.appService.updatePhoto(photo)
            .subscribe( response => console.log(response))
        
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
        this.getPanelMenu();
    }

    // ALBUM CRUD

    deleteAlbum(album:Album) {
        this.appService.deleteAlbum(album)
            .subscribe(response => console.log(response))
    }

}