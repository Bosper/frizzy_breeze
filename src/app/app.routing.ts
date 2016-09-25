import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';
import { DetailComponent } from './detail.component';
import { AboutComponent } from './about.component';
import { CategoryComponent } from './category.component';


const appRoutes: Routes = [
    {
        path: 'welcome',
        component: BaseComponent
    },
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    {
        path: 'story/:id',
        component: DetailComponent
    },
    {
        path: 'about-me',
        component: AboutComponent
    },
    {
        path: ':category/:id',
        component: CategoryComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);