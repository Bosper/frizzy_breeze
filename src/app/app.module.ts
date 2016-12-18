//CORE MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//THIRD PARTY MODULES
import { Ng2Webstorage } from 'ng2-webstorage';
import { MasonryModule } from 'angular2-masonry';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

//MOCKED BACK-END
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryData }  from './in-memory-data';

//SERVICES
import { routing } from './app.routing';
import { AppService } from './app.service';

//COMPONENTS
import { RootComponent } from './root.component';
import { BaseComponent } from './base.component';
import { DetailComponent } from './detail.component';
import { CategoryComponent } from './category.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { SocialComponent } from './social.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { PanelComponent } from './panel.component';
import { PanelSettingsComponent } from './panel-settings.component';
import { ModalComponent } from './modal.component';
import { ModalSmallComponent } from './modal-small.component';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


import { OrderByPipe } from '../pipes/sort.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        Ng2Webstorage,
        ModalModule,
        MasonryModule,
        //InMemoryWebApiModule.forRoot(InMemoryData),
        routing
    ],
    declarations: [
        //Components
        RootComponent, 
        BaseComponent, 
        DetailComponent, 
        AboutComponent, 
        ContactComponent,
        CategoryComponent, 
        SocialComponent, 
        DashboardComponent,
        LoginComponent,
        PanelComponent,
        PanelSettingsComponent,
        ModalComponent,
        ModalSmallComponent,
        //Directives
        FileSelectDirective,
        FileDropDirective,
        //Pipes
        OrderByPipe
        ],
    providers: [AppService, SocialComponent],
    bootstrap: [RootComponent]
})
export class AppModule { }