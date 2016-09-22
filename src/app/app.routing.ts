import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';
import { DetailComponent } from './detail.component';

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
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);