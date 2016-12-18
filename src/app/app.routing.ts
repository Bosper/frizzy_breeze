import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';
import { DetailComponent } from './detail.component';
import { AboutComponent } from './about.component';
import { CategoryComponent } from './category.component';
import { DashboardComponent } from './dashboard.component';
import { ContactComponent } from './contact.component';


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
        path: 'bio',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: ':url/:id',
        component: CategoryComponent
    },
    {
        path: 'authentication',
        component: DashboardComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);