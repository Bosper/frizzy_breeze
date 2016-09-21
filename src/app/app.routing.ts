import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';

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
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);