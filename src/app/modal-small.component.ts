import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppService } from './app.service';

import { Photo } from './photo.class';

@Component({
    selector: 'modal-small',
    templateUrl: 'modal-small.component.html'
})
export class ModalSmallComponent implements OnInit {

    @ViewChild('smModal') public modal:ModalDirective;

    photoForm: FormGroup;
    photo: Photo = new Photo();

    constructor(private appService: AppService) {
        this.photoForm = new FormGroup({
            active: new FormControl(''),
            order: new FormControl('')
        });
    }

    modifyPhoto(photo:Photo) {
        this.photo = photo;
        this.modal.show();
    }

    ngOnInit() { }

}