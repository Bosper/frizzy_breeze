import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
    @Output() emitPhoto: EventEmitter<any>;

    photoForm: FormGroup;
    photo: Photo;

    constructor(private appService: AppService) {
        this.photoForm = new FormGroup({
            id: new FormControl({value: "", disabled: true}, Validators.required),
            active: new FormControl(''),
            order: new FormControl(''),
            url: new FormControl({value: "", disabled: true}, Validators.required)

        });

        this.emitPhoto = new EventEmitter();
    }

    modifyPhoto(photo:Photo) {
        this.photo = photo;
        this.modal.show();
    }
    sendMidifiedPhoto(photo: FormGroup) {
        let newPhoto: Photo = photo.value;
        console.log("EMITTED PHOTO: ", newPhoto);
        this.emitPhoto.emit(newPhoto);
    }

    ngOnInit() { }

}