import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'; 

import { Album } from './album.class';

import './panel.component.scss';

@Component({
    selector: 'panel',
    template: require('./panel.component.html')
})
export class PanelComponent implements OnInit {

    albums: Album[];
    error: any;

    constructor(private appService: AppService) { }

    getAlbums() {
    return this.appService.getAlbums()
      .then(result => this.albums = result)
      .catch(error => this.error = error)
  }

    ngOnInit() { }

}